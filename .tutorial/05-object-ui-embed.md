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
- `object-id`: The unique identifier for the visualization to embed. Enter this object id as the value for this property: `ejNeB`.

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

Refresh the web application and navigate to the `qlik-embed objects` page to see it updated with the embedded visualizations.

## 5.2 Embed visualizations using expressions

In addition to rendering visualizations that exist in a Qlik Sense application, you can create visualizations dynamically on-the-fly using expressions.

Search for `QV04` in the index.html file.

Add this `<qlik-embed>` element below the line.

```html
<qlik-embed
  id="QV04"
  ui="analytics/chart"
  app-id="<appid>"
  type="barchart"
  dimensions='["[CategoryName]"]'
  measures='["=Sum(Sales)"]'
></qlik-embed>
```

The `type` property specifies the chart type to render. 

The `dimensions` property specifies the governed dimension or field names for the chart. The use of square brackets inside the double quotes is for Qlik script expression syntax support. The outside square brackets represent the array you can use to supply one or more dimensions.

The `measures` property specifies the calculation expression or governed measure for the chart. The use of square brackets inside the double quotes is for Qlik script expression syntax support. The outside square brackets represent the array you can use to supply one or more measures.

The `properties` property allow you to set specific properties available for the chart. Supply the value as a `JSON` string.
