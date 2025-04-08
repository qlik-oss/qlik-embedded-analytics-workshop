#!/usr/bin/env node

import { input, confirm } from '@inquirer/prompts';
import { triggerAsyncId } from 'async_hooks';
import chalk from 'chalk';
import { response } from 'express';
import ora from 'ora';
import validator from "email-validator";
import { access } from 'fs';
import config from '../config.js';
import randomstring from "randomstring";


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
  const tenant = await input({
    message: 'Input the hostname of your tenant. The part before the region designation.',
  });

//   let codespaceName = await confirm({
//     message: `Is the hostname in the simple browser address bar https://${process.env["CODESPACE_NAME"]}-3000.app.github.dev?`,
//     default: true
//   });
    //https://0xnu8fry2fgj2i4.us.qlikcloud.com/
    const tenantHostname = config.tenantHostname;
    const codespaceName = `https://${process.env["CODESPACE_NAME"]}-3000.app.github.dev/`;

//     const codespaceHostname = config.codespaceHostname;
  
// //   console.log(chalk.yellow(`You have entered ${tenant} for your hostname.`));
//   const spinner = ora('Processing...').start();
//   spinner.color = 'yellow';
//   spinner.text = 'Getting access token.';

    const at = await getTenantAccessToken(tenantHostname);

    spinner.start("Creating OAuth client on your tenant.")
    const clientId = await createTenantOAuthClient(tenantHostname, codespaceName, at);
    result = await sleep(1500, spinner, "Creating OAuth client on your tenant.");
    if(clientId) {
        spinner.succeed(`OAuth clientId created with value: ${JSON.stringify(clientId)}`);
    }

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

//   if(at) {
//     spinner.succeed();
//   }
//   spinner.text = "creating OAuth client on the tenant."

//   const spaClient = await createTenantOAuthClient(tenantHostname, codespaceHostname, at);
//     console.log(spaClient);
//     if(spaClient) {
//         spinner.succeed();
//         spinner.text = `clientId for your application: ${spaClient.clientId}`
//         spinner.stop;
//     }
    
};

main();

async function getTenantAccessToken(tenantHostname) {
    //replace with gh secrets in template repo
    const clientId = config.regionClientId;
    const clientSecret = config.regionClientSecret;

    const requestPayload = {
        "client_id": clientId,
        "client_secret": clientSecret,
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