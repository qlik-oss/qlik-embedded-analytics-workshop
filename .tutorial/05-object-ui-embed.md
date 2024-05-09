# 5 Embed charts and UI objects

In this section, you are going to learn how to embed individual visualizations into the web application using `qlik-embed`. 

Retrieve the application id you obtained in step [2.3](#23-import-qlik-sense-app).
Open the `index.html` file

## 5.1 Embed objects from Qlik Sense applications

### 5.1.1 Configure KPI01

In the html file, search for `KPI01`. You should land in the `<qlik-embed>` element with this id.

```html
<qlik-embed
   id="KPI01"
   ui="classic/chart"
   app-id="<app-id>"
   object-id="<object-id>"
   theme="embeddedtheme"
   >                                       
 </qlik-embed>
```

Update the following properties:

- `app-id`: The application id containing the visualization.
- `object-id`: The unique identifier for the visualization to embed. Enter `ejNeB` as the value for this property.

### 5.1.2 Configure additional embedded objects

Repeat step 5.1.1 searching for the element id, using the application id and entering the corresponding object-id in the appropriate property fields.

- KPI02
  - object-id: `AjaEfsc`
- KPI03
  - object-id: `wwSHz`
- QV01
  - object-id: `mAbpP`
- QV02
  - object-id: `LzuJNJ`

Refresh the rendered web page to see it updated with the embedded visualizations.

## 5.3 Embed visualizations using expressions

In addition to rendering visualizations that exist in a Qlik Sense application, you can create visualizations dynamically on-the-fly using expressions.

Search for `QV04` in the index.html file.

Add this `<qlik-embed>` element below the line.

```html
  <qlik-embed
    id="QV04"
    type="barchart"
    fields= "['CategoryName', '=sum(Sales)']"
  ></qlik-embed>
```

The `type` property specifies the chart type to render. 

The `fields` property accepts an array of field names and expressions to bring the chart to life.
