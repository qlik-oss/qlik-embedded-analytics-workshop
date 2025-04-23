# 1 Configure your environment

## 1.1 Install npm packages

First, you need to install the required Node.js packages.
Open a terminal or shell window. At the prompt, enter the command `npm install`. This will install the dependencies for running the web application.

## 1.2 Create your OAuth client

To use OAuth authentication within the workshop, you need to get an OAuth clientID from the Qlik Cloud tenant you have been registered to.
The next command will generate this OAuth clientId, and create a file **config.js** with the settings you will need to proceed with the workshop.

From a terminal or a shell, run `npx configure-workshop` and answers the questions asked during the setup.
Once the setup is complete, you can then check at the root level that the **config.js** file has been created with the appropriate settings.

### 1.3 Start the web application

In the terminal or shell window, enter the command `npm run start` at the prompt. This will start the web application.

[![Step 2 button](https://img.shields.io/badge/Step_2_--_Configure_the_Qlik_Cloud_tenant-green_>?style=for-the-badge)](.tutorial/02-config-qlik-cloud.md)
