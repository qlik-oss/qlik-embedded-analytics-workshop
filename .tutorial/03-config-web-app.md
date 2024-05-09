# 3 Configure the web application

## 3.1 qlik-embed web components configuration script

When you use qlik-embed web components to embed analytics, a configuration script instructs the web page how to treat elements with the `<qlik-embed/>` tag. This script resides inside the `<head/>` section of the html web page you're adding embedded analytics. Here's an example of the script:

```html
<script
  crossorigin="anonymous"
  type="application/javascript"
  src="https://cdn.jsdelivr.net/npm/@qlik/embed-web-components"
  data-host="https://<TENANT_HOSTNAME>.<REGION>.qlikcloud.com"
  data-auth-type="Oauth2"
  data-client-id="<OAUTH_SPA_CLIENT_ID_FROM_TENANT>"
  data-redirect-uri="<WEB_APPLICATION_CALLBACK_PAGE>"
  data-access-token-storage="session"
  data-auto-redirect="true"
></script>
```

## 3.1.1 Set the qlik-embed configuration

Update these properties in the configuration script:

- `data-host`: The full hostname of your Qlik Cloud tenant including `https://`.
- `data-client-id`: The OAuth client id from the OAuth client you configured in [2.1](#21-create-a-single-page-application-oauth-client).
- `data-redirect-uri`: The URL for the oauth-callback.html page used in the application. This is Dev URL you obtained in step [1.1.3](#113-obtain-the-web-application-address) with `/oauth-callback.html` added to the end of the URL.

## 3.1.2 Copy paste the script configuration

Copy the modified script configuration.
Inside each of the following files search for `BEGIN qlik-embed configuration`:

- index.html
- classic-app.html
- charts.html
- self-service.html

In the config script section, paste the script configuration.

## 3.2 Configure the oauth-callback.html file

Open the `oauth-callback.html` file and set the `data-host` property to the full hostname of your Qlik Cloud tenant including `https://`.
