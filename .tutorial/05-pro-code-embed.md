# 5 Pro-code embedded analytics

In this section, you are going to learn how to embed visualizations into the web application using JavaScript. For efficiency, this exercise contains completed scaffolding necessary for connecting to Qlik. If you want to learn about connecting to Qlik Cloud Analytics, keep reading. Otherwise, you can skip to step 5.2.

Pro-code embedding analytics requires two libraries: [enigma.js](https://qlik.dev/toolkits/enigma-js/) for back-end communication to the Qlik Analytics engine, and nebula.js for rendering visualizations in your web applications.

## 5.1 Connect to Qlik Cloud Analytics

Learn how to make a connection to the Qlik Analytics engine for use in your web application.

Open the `mashup.js` file of the workshop web application located in the `src/qlik/` directory for editing.

Get the configuration from the web application. 

```js
  const config = await fetch("config").then((response) => response.json());
```

This will enable using substitution throughout the rest of the code for items like your tenant, the web integration id, and the appId.

To prevent cross-site scripting request forgery (CSRF) to your tenant, Qlik cloud requires web applications to request a CSRF token for browser-based use cases.

Request a CSRF token using the `tenantHostname` and `qlikWebIntegrationId` properties from the config.

```js
  const csrfTokenInfo = await fetch(
    `https://${config.tenantHostname}/api/v1/csrf-token?qlik-web-integration-id=${config.qlikWebIntegrationId}`,
    {
      credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": config.qlikWebIntegrationId,
      },
    }
  );
  console.log("Token ", csrfTokenInfo.headers.get("qlik-csrf-token"));
```

Construct a URL for connecting to the Qlik Sense app you want to embed visualizations from using the `tenantHostname`, `appId, `qlikWebIntegrationId`, and the CSRF token you obtained earlier.

```js
  const url = `wss://${config.tenantHostname}/app/${
    config.appId
  }?qlik-web-integration-id=${
    config.qlikWebIntegrationId
  }&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;
```

Before creating session with the Qlik Cloud Analytics engine, you need to fetch a schema to be able to communicate with the API.

```js
const schema = await (
    await fetch("https://unpkg.com/enigma.js/schemas/3.2.json")
  ).json();
```

Use the `schema` and `url` to create a session to Qlik Cloud using the [enigma.js](https://qlik.dev/toolkits/enigma-js/) library.

```js
const session = window.enigma.create({ schema, url });
```

Open the session by specifying the `appId` from the config.

```js
const app = await (await session.open()).openDoc(config.appId);
```

After connecting to Qlik Cloud you can use the `app` reference to embed visualizations using nebula.js from the Qlik Sense application into the web application.

Define a variable to connect nebula.js to the Qlik Sense application.

```js
const qlikEmbed = window.stardust.embed(app, {});
```

Inside the `{}` there are a number of properties you can configure to instruct the nebula.js library.

Set the `flags` property to support linechart forecasting

```js
flags: { LINECHART_FORECAST: true },
```

Add the visualization libraries you intend to embed into the web application using the `types` property.

```js
types: [
      {
        name: "linechart",
        load: () => Promise.resolve(window["sn-line-chart"]),
      },
      {
        name: "piechart",
        load: () => Promise.resolve(window["sn-pie-chart"]),
      },
      {
        name: "barchart",
        load: () => Promise.resolve(window["sn-bar-chart"]),
      },
      {
        name: "kpi",
        load: () => Promise.resolve(window["sn-kpi"]),
      },
      {
        name: "treemap",
        load: () => Promise.resolve(window["sn-treemap"]),
      },
    ],
```

With nebula.js configuration complete, you can use the `qlikEmbed` variable to render visualizations in the web application.

## 5.2 Embed objects from Qlik Sense applications

In this section, you're going to use the `qlikEmbed` variable from Step 5.1 to render visualizations in the workshop web application.

Open the `mashup.js` file of the workshop web application located in the `src/qlik/` directory for editing.

Search in the file for `embed-objects-section` and go to that line.

Add this render function below the line.
```js
qlikEmbed.render({
  element: document.getElementById('KPI01'),
  id:'ejNeB'
});
```
Save the `mashup.js` file.

Open the web application and you can see a KPI object has appeared at the top of the page. Add the remaining functions to render the objects in the web application.

```js
qlikEmbed.render({
    element:document.getElementById('KPI02'),
    id:'AjaEfsc'
  });

qlikEmbed.render({
    element: document.getElementById('KPI03'),
    id: 'wwSHz',
  });

qlikEmbed.render({
    element: document.getElementById('QV01'),
    id: 'mAbpP',
  });

qlikEmbed.render({
    element: document.getElementById('QV02'),
    id: 'LzuJNJ',
  });
```

Save the `mashup.js` file.

The `render` function uses the `element` property to identify where in the HTML page to place the visualization. The `id` property is the unique identifier for the visualization in the Qlik Sense application.

>**Note:** Finding the unique identifiers for Qlik objects can be a pain. Thankfully, there are some great tools out there that make it easier like the [Add Sense](https://chrome.google.com/webstore/detail/add-sense/bbiljflfafkaejgdebbnmcohpidgkejj) Chrome extension.

## 5.3 Embed visualizations using expressions

In addition to rendering visualizations that exist in a Qlik Sense application, you can create visualizations dynamically on-the-fly using expressions.

Open the `mashup.js` file of the workshop web application located in the `src/qlik/` directory for editing.

Search in the file for `on-the-fly-section` and go to that line.

Add this render function below the line.

```js
qlikEmbed.render({
  element: document.getElementById('QV04'),
  type: 'barchart',
  fields: ['CategoryName', "=sum(Sales)"],
});
```

Save the `mashup.js` file.

In this `render` function, the `element` property serves the same purpose as before, instructing qlikEmbed where to render the visualization in the web application. Instead of the `id` property, two alternative properties are in place: the `type` and the `fields` properties.

The `type` property specifies the chart type to render. 

The `fields` property accepts an array of field names and expressions to bring the chart to life.
