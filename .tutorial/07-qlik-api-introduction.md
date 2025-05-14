# 7 Discovering qlik-api

In addition to qlik-embed, `qlik-api` is the solution of choice when it comes to leveraging the QIX engine.  

This example illustrates how you can easily use `qlik-api` to create hypercube from the dataset used in an app, and how you can display the related table in plain HTML.

## 7.1 Adding a createCube method

Open the JavaScript file [`src/qlik/createCube.js`](/src/qlik/createCube.js) and have a look at how the `createCube` method looks like.  

This method accepts a hypercube definition and a function definition to be called each time the `changed` event fires on the hypercube object.

Here is the hypercube definition that will be used:

```javascript
  const cubeDef = {
    qInfo: {
        qId: 'sessionChart',
        qType: 'qHyperCubeDef'
    },
  qHyperCubeDef: {
      qDimensions: [
        {
            qLibraryId: 'FFQHMq',
        },
        {
          qLibraryId: 'KFmTudV',
        }
      ],
      qMeasures: [
        {
          qDef: { qDef: "=SUM(Sales)", qLabel: "Total Sales" },
        },
      ],
      qInitialDataFetch: [
        {
          qLeft: 0,
          qTop: 0,
          qHeight: 100,
          qWidth: 3,
        },
      ],
    },
  };
  ```

## 7.2 Displaying the hypercube data

Now, you can create a plain HTML table to display the data.  

Open the file [`src/qlik-api-table.html`](/src/qlik-api-table.html) and search for `<!-- This is the script that will be used to create the hypercube -->`, at the end of this file.  
You can see how `qlik-api` is used to retrieve to open an app session, get the doc and the layout to create and populate the HTML table into the `<div>` element.
