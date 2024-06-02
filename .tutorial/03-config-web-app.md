# 3 Configure the web application

## 3.1 qlik-embed web components configuration script

When you use qlik-embed web components to embed analytics, a configuration script instructs the web page how to treat elements with the `<qlik-embed/>` tag. This script resides inside the `<head/>` section of the html web page you're adding embedded analytics. Here's an example of the script:

```html
<script
  crossorigin="anonymous"
  type="application/javascript"
  src="https://cdn.jsdelivr.net/npm/@qlik/embed-web-components@1.2.0/dist/index.min.js"
  data-host="https://<TENANT_HOSTNAME>.<REGION>.qlikcloud.com"
  data-auth-type="Oauth2"
  data-client-id="<OAUTH_SPA_CLIENT_ID_FROM_TENANT>"
  data-redirect-uri="<WEB_APPLICATION_CALLBACK_PAGE>"
  data-access-token-storage="session"
  data-auto-redirect="true"
></script>
```

In this workshop, the configuration script is constructed from the contents of the `config.js` file.

## 3.1.1 Set the qlik-embed configuration

Open the `config.js` file from the file list to the left. Update these properties in the `config` object:

- `host`: The full hostname of your Qlik Cloud tenant. For example, if your tenant is named "example" and runs in the "US" region, then the hostname you enter is `https://example.us.qlikcloud.com`.
- `clientId`: The OAuth client id from the OAuth client you configured in [2.1](#21-create-a-single-page-application-oauth-client).
- `redirectUri`: The URL for the oauth-callback.html page used in the application. This is Dev URL you obtained in step [1.1.3](#113-obtain-the-web-application-address) with `/oauth-callback.html` added to the end of the URL.
- `appId`: The id for the Sales Analytics application on your tenant you uploaded in [2.3](#23-import-qlik-sense-app).

Here's an example of a completed `config.js` file:

```javascript
const config = {
  host: "https://example.us.qlikcloud.com",
  clientId: "0232949590293494592",
  redirectUri: "https://some-replit-url.com/oauth-callback.html", //remember /oauth-callback.html
  appId: "a516f00000000000000",
}

export default config;
```

Save the `config.js` file.

## 3.2 Configure the oauth-callback.html file

Open the `oauth-callback.html` file and set the `data-host` property to the full hostname of your Qlik Cloud tenant including `https://`.

Click the stop and run button at the top of the screen. 