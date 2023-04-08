/**
 * Script to manage the integration with Javascript. Please follow the steps in the tutorial and paste the right snippet of code in the indicated area
 */

(async () => {
  // Get the configuration information from the config.js file
  const config = await fetch("config").then((response) => response.json());

  //fetch-theme

  //Get the cross-site scripting token to allow requests to QCS from the web app
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

  // Build the websocket URL to connect to the Qlik Sense applicaiton
  const url = `wss://${config.tenantHostname}/app/${
    config.appId
  }?qlik-web-integration-id=${
    config.qlikWebIntegrationId
  }&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;

  // Fetch the schema for communicating with Qlik's engine API
  const schema = await (
    await fetch("https://unpkg.com/enigma.js/schemas/3.2.json")
  ).json();

  // Create Qlik engine session
  const session = window.enigma.create({ schema, url });

  // Open the application
  const app = await (await session.open()).openDoc(config.appId);

  // configure nebula
  const qlikEmbed = window.stardust.embed(app, {

    // theme-property

    // context-property

    flags: { LINECHART_FORECAST: true },

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
  });

  // embed-objects-section
  
  
  // on-the-fly-section

  // selection-bar-entry

  //7.1 paste your code here to add the Clear All filters handler

  //7.2 paste your code here to add the apply selection 'Italy' handler
})();
