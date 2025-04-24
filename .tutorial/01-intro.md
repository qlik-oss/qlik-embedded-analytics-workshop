# 1 Configure your environment

## 1.1 Install npm packages

First, you need to install the required Node.js packages.  
Open a terminal or shell window. At the prompt, enter the command `npm install`. This will install the dependencies required to run the web application.

## 1.2 Create your OAuth client

To use OAuth authentication in the workshop, you need to obtain an OAuth client ID from the Qlik Cloud tenant you have registered with.
The next command will generate this OAuth clientID, and create a **config.js** file with the settings you will need to continue the workshop.

From a terminal or a shell, run `npx configure-workshop` and answers the questions asked during the setup.
Once the setup is complete, you can then check at the root level that the **config.js** file has been created with the appropriate settings.

### 1.3 Start the web application

In the terminal or shell window, enter the command `npm run start` at the prompt. This will start the web application.

[![Step 2 button](https://img.shields.io/badge/Step_2_--_Configure_the_Qlik_Cloud_tenant_>-green?style=for-the-badge)](02-config-qlik-cloud.md)
