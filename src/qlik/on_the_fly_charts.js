/**
 * On The Fly with Nebula 
 */
(async () => {

    // Get the configuration information from the config.js file
    const config =  await fetch("config").then((response) =>
      response.json()
    );

  //get the theme file from backend server
  const themeFile =  await fetch("theme").then((response) =>
    response.json()
    );

  //Get the cross-site scripting token to allow requests to QCS from the web app
  const csrfTokenInfo =  await fetch(
      `https://${config.tenantHostname}/api/v1/csrf-token?qlik-web-integration-id=${config.qlikWebIntegrationId}`,
      {
      credentials: "include",
      headers: {
          "Qlik-Web-Integration-ID": config.qlikWebIntegrationId
      }
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

  // create a session Object to retrieve the list of Master Measures
  const measureSessionObject = await app.createSessionObject(		{
    "qInfo": {
      "qType": "MeasureList"
    },
    "qMeasureListDef": {
      "qType": "measure",
    }
  }
  );
  var result1 = await measureSessionObject.getLayout();
  var measure_list = result1.qMeasureList.qItems;

 // create a session Object to retrieve the list of Master Dimensions
  const dimensionSessionObject = await app.createSessionObject({
    "qInfo": {
      "qType": "DimensionList"
    },
    "qDimensionListDef": {
      "qType": "dimension",
    }
  }
  );
  var result2 = await dimensionSessionObject.getLayout();
  var dimension_list = result2.qDimensionList.qItems;

  //function to create the <select> options for measures and dimensions
  function createMasterList(fieldType, masterlist) {
        var master_dict ={};
        for(i=0; i<masterlist.length; i++){
          master_dict[masterlist[i].qMeta["title"]] = masterlist[i].qMeta["description"];
        }

        var selectItem = document.getElementById('qc'+fieldType);
        if (fieldType == 'Dimension'){
            master_dict = {
              'Country':'Country', 
              'CategoryName': 'CategoryName', 
              'ProductName': 'ProductName', 
              'EmployeeName':'EmployeeName'
            }
        }
        for (var key in master_dict) {
            var newOption = document.createElement("option");
            newOption.text = key;
            newOption.value = key;
            selectItem.add(newOption);          
        }

  }

  //create master measures options in the html
  createMasterList('Measure', measure_list);
  //create master dimension options in the html
  createMasterList('Dimension', dimension_list);

  // configure nucleus
  const nuked = window.stardust.embed(app, {

    themes:[
      {
        id: 'custom_theme',
        load: () => Promise.resolve(themeFile),
      }

    ],

    context: {
      theme: 'custom_theme',
      language: 'en-US',
    },

    flags: { LINECHART_FORECAST: true },

    types: [
    {
      name: 'linechart',
      load: () => Promise.resolve(window['sn-line-chart']),
    },
    {
      name: 'piechart',
      load: () => Promise.resolve(window['sn-pie-chart']),
    },
    {
      name: 'barchart',
      load: () => Promise.resolve(window['sn-bar-chart']),
    },
    {
      name: 'scatterplot',
      load: () => Promise.resolve(window['sn-scatter-plot']),
    },

    {
      name: 'table',
      load: () => Promise.resolve(window['sn-table']),
    }


    ],
  });

  var chartType = "barchart";

  nuked.render({
    element:document.getElementById('QV05'),
    type: chartType,
    fields: ['CategoryName', "=[Sales]"],

  });


  const btn_bar = document.getElementById('btn-bar');
  btn_bar.addEventListener('click', function handleClick() {
    chartType="barchart";
    plotChart()

  });

  const btn_pie = document.getElementById('btn-pie');
  btn_pie.addEventListener('click', function handleClick() {
    chartType="piechart";
    plotChart()

  });


  const btn_line = document.getElementById('btn-line');
  btn_line.addEventListener('click', function handleClick() {
    chartType="linechart";
    plotChart()

  });

  const btn_table = document.getElementById('btn-table');
  btn_table.addEventListener('click', function handleClick() {
    chartType="table";
    plotChart()

  });


  $("#qcMeasure").on('change',  async function() {
    plotChart();
  })


  
  $("#qcDimension").on('change',  async function() {
    plotChart();
  })



async function plotChart(){
    //flush previous visualization
    document.getElementById("QV05").innerHTML = "";
    //retrieve measure
    measure= document.getElementById('qcMeasure').value;
    //retrieve dimension
    dimension= document.getElementById('qcDimension').value;

    nuked.render({
      element:document.getElementById('QV05'),
      type: chartType,
      fields: [dimension, "=["+measure+"]"],
      properties: {
        title: measure+" by " +dimension,
      },
    }); 

}


  
})();








