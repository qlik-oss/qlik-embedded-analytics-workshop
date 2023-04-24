# 3 Configure the web application

Access the config folder and open the `config.js` file.

```javascript
  module.exports = {
    qlikWebIntegrationId: "<WEB_INTEGRATION_ID>", //The value created in 2.4
    tenantHostname: "<TENANT_HOSTNAME>", //For example: example.us.qlikcloud.com
    appId: "<APP_GUID>", //For example: 9eb11ea5-a66f-4b07-be0c-c263a7aad51e
    sheetId: "a8bdb8b2-525e-486e-91d1-7318d362acee",
    theme: "embeddedtheme",
  };
```
Update these properties:

* `qlikWebIntegrationId`: The value you created in step 2.1
* `tenantHostname`: The domain URI for your tenant.
* `appId`: The value you copied in step 2.4 after importing the Qlik Sense application to your tenant.

Leave the remaining values untouched. Save the `config.js` file.
