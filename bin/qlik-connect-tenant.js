#!/usr/bin/env node

import { input, confirm } from '@inquirer/prompts';
import ora from 'ora';
import validator from "email-validator";
import workshopSettings from './workshop-settings.js';
import randomstring from "randomstring";
import { createConfigFile, updateOAuthCallback } from "./configure-workshop.js";

const main = async () => {
    let result = "";
    const spinner = ora("");

    const confirmParticipation = await confirm({
        message: "Use of this workshop requires your name and email so that the tenant can create a user and send an email to you. Continue?",
        default: true
    });

    if (!confirmParticipation) {
        spinner.fail("You've decided not to participate. If you change your mind, run the script again.");
        process.exit();
    };

    const userInput = {
        email: await input({
            message: "Enter your email address.",
            validate: (email) => {
                if (!validator.validate(email)) {
                    return "Please enter a valid email address."
                }
                return true
            }
        })
    };

    const createTenant = await confirm({
        message: "Do you want to create a new tenant today?",
        default: false
    });

    let tenantHostname = "";
    let appId = "";
    let assistantId = "";

    if (createTenant) {
        const data = await createTenantAndAppId();
        if (data) {
            tenantHostname = "https://" + data.tenantHostname + "/";
            appId = data.appId;
            spinner.succeed(`Tenant created with URL: ${tenantHostname}`);
        } else {
            spinner.fail("Failed to create tenant.");
            process.exit();
        }
    } else {
        const tenant = {
            tenantInput: await input({
                message: 'Input the URL to your tenant. Currently must be a US region Qlik Cloud tenant only',
                validate: (tenantInput) => {
                    if (!tenantInput || !URL.canParse(tenantInput)) {
                        return "Please enter a valid tenant URL."
                    }
                    if (!tenantInput.startsWith("https://")) {
                        return "Please enter a valid tenant URL. Must start with https://"
                    }
                    if (!tenantInput.endsWith("/")) {
                        return "Please enter a valid tenant URL. Must end with /"
                    }
                    if (tenantInput.includes("us.qlikcloud.com")) {
                        return true;
                    } else {
                        return "Please enter a valid tenant URL. Must be a US region Qlik Cloud tenant."
                    }
                }
            })
        };

        tenantHostname = tenant.tenantInput;
    };

    const codespaceName = `https://${process.env["CODESPACE_NAME"]}-3000.app.github.dev/`;
    const at = await getTenantAccessToken(tenantHostname, ["admin_classic"]);

    //get appId for Sales Analytics app on tenant.
    if (!appId)
        appId = await getAppId(tenantHostname, at);
    if (appId) {
        spinner.text = "The workshop app exists on the tenant."
    }

    //get assistant Id for chatty
    if (!assistantId)
        assistantId = await getAssistantId(tenantHostname, at);
    if (assistantId) {
        spinner.text = "The workshop assistant exists on the tenant."
    }

    spinner.start("Creating OAuth client on your tenant.")
    const clientId = await createTenantOAuthClient(tenantHostname, codespaceName, at);
    result = await sleep(1500, spinner, "Creating OAuth client on your tenant.");
    if (clientId) {
        spinner.succeed(`OAuth clientId created with value: ${clientId}`);
    }

    spinner.start("Updating oauth-callback file");
    updateOAuthCallback(tenantHostname);

    sleep(1500, spinner, "Updating oauth-callback file");
    spinner.succeed("oauth-callback file updated");

    spinner.start("Creating config.js file");
    sleep(1500, spinner, "Creating config.js file");

    const configData = {
        host: tenantHostname,
        codespaceHostname: codespaceName,
        clientId: clientId,
        appId: appId,
        sheetId: workshopSettings.sheetId,
        assistantId: assistantId
    };

    createConfigFile(configData);
    spinner.succeed("config.js file created");

    spinner.start("Checking for email on tenant.");
    const isUser = await userExists(tenantHostname, at, userInput);

    if (isUser) {
        spinner.succeed("You have an account on this tenant.");
    } else {
        spinner.start("You need an account on this tenant. Let's create it.");
        result = await sleep(1500, spinner, "Contacting your tenant");
        spinner.succeed("Contacted tenant");
        spinner.start("Creating user on the system");
        const userCreated = await createUser(tenantHostname, at, userInput)
        result = await sleep(1500, spinner, "Creating user on the system");
        if (userCreated) {
            const addAdminRole = await makeUserAdmin(tenantHostname, at, userCreated);
            if (!addAdminRole) {
                console.error("User not added as admin on tenant.")
            }
        } else {
            throw new Error(`Workshop setup failed on user creation and invite on tenant.`);
        }
        spinner.succeed("Created user on the system");
        spinner.start("Check your email");
        result = await sleep(1500, spinner, "Check your email");
        spinner.succeed("Check your email");
    }

    spinner.succeed("You can now start the workshop by entering npm run start at the prompt");
    process.exit();
};

main();


async function createTenantAndAppId() {
    try {
        const response = await fetch(workshopSettings.tenantCreationLambdaUrl, { method: "POST" });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to create tenant: ${error}`);
        throw new Error(`Failed to create tenant: ${error}`);
    }
}

async function getTenantAccessToken(tenantHostname, scopes) {

    //"https://ubzt66e9je.execute-api.us-east-1.amazonaws.com/token/"
    const requestPayload = {
        "tenantHostname": tenantHostname,
        "scopes": scopes
    };

    //get access token to tenant
    try {
        //console.log(`Requesting access token for ${tenantHostname} with scopes: ${scopes}`);
        //console.log(`Calling ${workshopSettings.regionalOAuthLambaUrl}`);
        //console.log(`Payload: ${JSON.stringify(requestPayload)}`);

        const response = await fetch(workshopSettings.regionalOAuthLambaUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload)
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const atData = await response.json();
        return atData.accessToken;
    } catch (error) {
        console.error(`Failed to get access token: ${error}`);
        throw new Error(`Failed to get access token: ${error}`);
    }
}

async function createTenantOAuthClient(tenantHostname, codespaceHostname, accessToken) {

    const clientName = `Qlik-embed-workshop-${randomstring.generate(6)}`
    const requestPayload = {
        "appType": "spa",
        "clientName": clientName,
        "description": "The name of this client is " + clientName,
        "redirectUris": [`${codespaceHostname}oauth-callback.html`],
        "allowedScopes": ["user_default"],
        "allowedOrigins": [`${removeTrailingSlash(codespaceHostname)}`]
    };

    try {
        const spaClient = await fetch(`${tenantHostname}api/v1/oauth-clients`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(requestPayload)
        });
        const response = await spaClient.json();
        return response.clientId;
    } catch (error) {
        throw new Error(`Failed to create OAuth client on ${tenantHostname}`, error)
    }
}

async function createUser(tenantHostname, accessToken, userInput) {

    const requestPayload = {
        invitees: [
            {
                email: userInput.email
            }
        ]
    };
    try {
        const response = await fetch(`${tenantHostname}api/v1/users/actions/invite`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload)

        });

        if (!response.ok) {
            throw new Error(`Response status on invite user: ${response.status}`)
        }

        const data = await response.json();
        const userId = data.data[0].userId;
        return userId;
    } catch (error) {
        console.error(error.message);
        throw new Error(`Failed to invite user to tenant.`);
    }
}

async function makeUserAdmin(tenantHostname, accessToken, userId) {
    const addRoleAssignment = [{
        op: "replace",
        path: "/assignedRoles",
        value: [{
            name: "TenantAdmin"
        }]
    }];

    try {
        const response = await fetch(`${tenantHostname}api/v1/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addRoleAssignment)
        });

        if (!response.ok) {
            console.error(`Response status on set role assignment on user: ${setUserAdmin.status}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function userExists(tenantHostname, accessToken, userInput) {

    const params = new URLSearchParams();
    params.append("filter", `email eq "${userInput.email}"`);

    try {
        const response = await fetch(`${tenantHostname}api/v1/users?${params}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();
        if (data.data.length == 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function getAppId(tenantHostname, accessToken) {

    const params = new URLSearchParams();
    params.append("name", "sales analytics");
    params.append("resourceType", "app");

    try {
        const response = await fetch(`${tenantHostname}api/v1/items?${params}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();
        if (data.data.length == 1) {
            return data.data[0].resourceId;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function getAssistantId(tenantHostname, accessToken) {
    const params = new URLSearchParams();
    params.append("name", "chatty");
    params.append("resourceType", "assistant");

    try {
        const response = await fetch(`${tenantHostname}api/v1/items?${params}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();
        if (data.data.length == 1) {
            return data.data[0].resourceId;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

function removeTrailingSlash(string) {
    if (string && string.endsWith('/')) {
        return string.slice(0, -1);
    }
    return string;
}

async function sleep(ms, spinner, text) {
    if (spinner && text) {
        return new Promise(resolve => setTimeout(() => {
            spinner.text = text;
            resolve(text)
        }, ms));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
