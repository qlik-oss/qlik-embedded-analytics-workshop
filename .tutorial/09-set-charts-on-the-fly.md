# 9 Set charts on the fly

Qlik-embed has functionality to create charts and visualizations on the fly. You made charts on the fly work in step [6.2](#62-embed-visualizations-using-expressions) when you supplied expressions for dimensions and measures.

In this example, you can make changes to the chart definition dynamically using javascript and the document object model (DOM) for the web page.

In previous sections of this workshop, you didn't have to supply the initialization script at the top of the page. However, for charts on the fly to work on this page you need to add the initialization script manually to the code.

## 9.1 Obtain the configuration script

Click the **cheat sheet** button in the side panel of the web application.

Click the **Copy configuration** button to store the configuration to your clipboard.

## 9.2 Add configuration script template to charts.html page

Open the `charts.html` page located in the `src` directory. Locate the section `qlik-embed script configuration` and copy/paste the script snippet from the clipboard to the file. It will look similar to the example.

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

## 9.3 Update the app id for the qlik-embed element

Click the **cheat sheet** button in the side panel of the web application.

Click the **Copy appId** button to store the appId to your clipboard.

Open the `charts.html` page located in the `src` directory. Locate `charts-on-the-fly-element` in the file.

In the `qlik-embed` element, update the `app-id` attribute to the id for the Sales Analytics you got from the cheat sheet.

```html
<qlik-embed
  id="QV05"
  ui="analytics/chart"
  app-id="<APP-ID>"
  object-id="mAbpP"
></qlik-embed>
```

Refresh the application web page. You should see the drop-down items populate with dimensions and measures. You can select from the drop-downs and see the chart update. In addition, you can click on one of the icons to change the chart type.

## 9.4 How dynamic charts on the fly works

With `qlik-embed` it's possible to get a handle of an embedded chart object. With this handle, you can gain access to the underlying metadata of the object and a connection to all of the metadata in the application. Here's how to get a handle of a `qlik-embed` object.

```javascript

// Create variables for future use
let chartType, dimension, measure;

// Get the qlik-embed element in the web page 
const element = document.getElementById("QV05");

// Get the handle to the qlik API
const refApi = await element.getRefApi();

// Create a reference to get the analytics application model
const app = await refApi.getDoc();

// Obtain a list of measures in the application
const qcMeasure = await app.getMeasureList();

// Obtain a list of dimensions in the application
const qcDimension = await app.getDimensionList();

```

Once you have access to the application model, you can use Javascript to build out the drop down lists and manipulate the `qlik-embed` elements in the web page to create a dynamic experience.

```javascript
function createSavedList(fieldType, savedlist) {
  var saved_dict ={};
  for(let i=0; i<savedlist.length; i++){
    saved_dict[savedlist[i].qMeta["title"]] = savedlist[i].qMeta["description"];
  }

  var selectItem = document.getElementById('qc'+fieldType);
  if (fieldType == 'Dimension'){
    saved_dict = {
      'Country':'Country', 
      'CategoryName': 'CategoryName', 
      'ProductName': 'ProductName', 
      'EmployeeName':'EmployeeName'
    }
  }
  for (var key in saved_dict) {
    var newOption = document.createElement("option");
    newOption.text = key;
    newOption.value = key;
    selectItem.add(newOption);          
  }

}

//create saved measures options in the html
createSavedList('Measure', qcMeasure);
//create saved dimension options in the html
createSavedList('Dimension', qcDimension);
```

Lastly, there is a function called `plotChart` whose job it is to handle what the user selects from the drop-down lists and the chart type buttons.

Each code block in the example tells the application how to handle a change using event listeners added to the DOM elements.

```javascript
document.getElementById('btn-bar').onclick= () => {
  chartType = "barchart";
  measure = document.getElementById('qcMeasure').value;
  dimension = document.getElementById('qcDimension').value;
  plotChart(chartType, dimension, measure);

};

const btn_pie = document.getElementById('btn-pie');
btn_pie.addEventListener('click', async function handleClick() {
  chartType="piechart";
    measure = document.getElementById('qcMeasure').value;
    dimension = document.getElementById('qcDimension').value;
    plotChart(chartType, dimension, measure);

  });

const btn_line = document.getElementById('btn-line');
btn_line.addEventListener('click', async function handleClick() {
  chartType="linechart";
    measure = document.getElementById('qcMeasure').value;
    dimension = document.getElementById('qcDimension').value;
    plotChart(chartType, dimension, measure);
  });

const btn_table = document.getElementById('btn-table');
btn_table.addEventListener('click', async function handleClick() {
  chartType="table";
    measure = document.getElementById('qcMeasure').value;
    dimension = document.getElementById('qcDimension').value;
    plotChart(chartType, dimension, measure);
  });

const selectMeasure = document.getElementById('qcMeasure');
selectMeasure.addEventListener('change', async function () {
  if(!chartType) {
    chartType="linechart";
  }
  measure = document.getElementById('qcMeasure').value;
  dimension = document.getElementById('qcDimension').value;
  plotChart(chartType, dimension, measure);
});

const selectDimension = document.getElementById('qcDimension');
selectDimension.addEventListener('change', async function () {
  if(!chartType) {
    chartType="linechart";
  }
  measure = document.getElementById('qcMeasure').value;
  dimension = document.getElementById('qcDimension').value;
  plotChart(chartType, dimension, measure);
});
```
