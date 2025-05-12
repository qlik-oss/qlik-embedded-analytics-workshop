# 7 Discovering qlik-api

In addition to qlik-embed, `qlik-api` is the solution of choice when it comes to leveraging the QIX engine.  

This example illustrates how you can easily use `qlik-api` to create hypercube from the dataset used in an app, and how you can display the related table in plain HTML.

## 7.1 Adding a createCube method

Open the JavaScript file `src/qlik/createCube.js` and have a look at how the 