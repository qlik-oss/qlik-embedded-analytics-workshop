#!/usr/bin/env node

import { input, confirm } from '@inquirer/prompts';
import { triggerAsyncId } from 'async_hooks';
import chalk from 'chalk';
import { response } from 'express';
import ora from 'ora';
import validator from "email-validator";
import { access } from 'fs';
//import config from '../config.js.old';
import randomstring from "randomstring";
import { createConfigFile, updateOAuthCallback } from "./configure-workshop.js";

const regionClientId = process.env["REGION_CLIENT_ID"];
const regionClientSecret = process.env["REGION_CLIENT_SECRET"];

const main = async () => {
    let result = "";
    const spinner = ora("");

    const confirmParticipation = await confirm({
        message: "Use of this workshop requires your name and email so that the tenant can create a user and send an email to you. Continue?",
        default: true
    });

  if(!confirmParticipation) {
    spinner.fail("You've decided not to participate. If you change your mind, run the script again.");
    process.exit();
  }

  const userInput = {
    email: await input({
        message: "Enter your email address.",
        validate: (email) => {
            if(!validator.validate(email)) {
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

  if(createTenant) {
    spinner.text = "tenant creation not implemented yet. you will need to supply a tenant URL."
    await sleep(1500,spinner, "tenant creation not implemented yet. you will need to supply a tenant URL.")
  }

  const tenant = await input({
    message: 'Input the URL to your tenant. Currently must be a US region Qlik Cloud tenant only',
  });

    const tenantHostname = tenant
    const codespaceName = `https://${process.env["CODESPACE_NAME"]}-3000.app.github.dev/`;

    const at = await getTenantAccessToken(tenantHostname);

    //get appId for Sales Analytics app on tenant.
    const appId = await getAppId(tenantHostname, at) || "NoAppFound";
    if(appId) {
        spinner.text = "The workshop app exists on the tenant"
    }

    spinner.start("Creating OAuth client on your tenant.")
    const clientId = await createTenantOAuthClient(tenantHostname, codespaceName, at);
    result = await sleep(1500, spinner, "Creating OAuth client on your tenant.");
    if(clientId) {
        spinner.succeed(`OAuth clientId created with value: ${JSON.stringify(clientId)}`);
    }

    spinner.start("Updating oauth-callback file");
    updateOAuthCallback(tenant);
    const configData = {
        host: tenant,
        codespaceHostname: codespaceName,
        clientId: clientId.clientId,
        appId: appId,
        sheetId: "a8bdb8b2-525e-486e-91d1-7318d362acee"
    };

    spinner.start("creating config.js file");
    createConfigFile(configData);

    spinner.start("Checking for email on tenant.");
    const isUser = await userExists(tenantHostname, at, userInput);
    
    if(isUser) {
        spinner.succeed("You have an account on this tenant.");
    } else {
        spinner.start("You need an account on this tenant. Let's create it.");
        result = await sleep(1500, spinner, "Contacting your tenant");
        spinner.succeed("Contacted tenant");
        spinner.start("Creating user on the system");
        const userCreated = await createUser(tenantHostname, at, userInput)
        result = await sleep(1500, spinner, "Creating user on the system");
        if(userCreated) {
            const addAdminRole = await makeUserAdmin(tenantHostname, at, userCreated);
            if(!addAdminRole) {
                console.error("User not added as admin on tenant.")
            }
        } else {
            throw new Error(`Workshop setup failed on user creation and invite on tenant`);
        }
        spinner.succeed("Created user on the system");
        spinner.start("Check your email");
        result = await sleep(1500, spinner, "Check your email");
        spinner.succeed("Check your email");
        process.exit();
    }
};

main();

async function getTenantAccessToken(tenantHostname) {

    const requestPayload = {
        "client_id": regionClientId,
        "client_secret": regionClientSecret,
        "scope": ["admin_classic"],
        "grant_type": "client_credentials"
    };

    //get access token to tenant
    try {
        const response = await fetch(`${tenantHostname}oauth/token`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload)
        });
        
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const atData = await response.json();
        return atData.access_token;
    } catch (error) {
        throw new Error('Failed to get access token', error);
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
        return response;
    } catch(error) {
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
        
        if(!response.ok) {
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
    
        if(!response.ok) {
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
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();
        if(data.data.length == 1) {
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
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();
        if(data.data.length == 1) {
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
    if(spinner && text) {
        return new Promise(resolve => setTimeout(() => {
            spinner.text = text;
            resolve(text)
        }, ms));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}