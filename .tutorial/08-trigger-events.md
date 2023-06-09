# 8 Trigger events on analytics data

You can do more than embed visualizations when you embed Qlik Cloud Analytics. The engine you connected to in step 5.1 enables you to execute functions and trigger events on the analytics data in the application directly.

## 8.1 Clear selections

For example, you can add a button to the web application that clears all of the selections that have been made.

<img src="../img/clear_filters.png" width="300" title="hover text"/>

To add a clear all selections function to the eraser button seen in the image above, open the `mashup.js` file and search in the file for `clear-all`.

Add a click event to the code so that when the eraser is clicked, the web application calls the `app.clearAll()` function on the analytics application running on Qlik Cloud.

```js
$('#clearAll').click(async function() { 
  app.clearAll();
});
```

Save `mashup.js`. Go to the web application and make some selections in the embedded visualizations. Then click on the eraser icon and observe the content goes back to the default selection.

## 8.2 Select a specific field value

You can also contact the data model directly and apply selections to the embedded visualizations. In this section, you are going to add a button to the `index.html` page and connect it to a function in `mashup.js` that will select the field value "Italy" from the "Country" field in the analytics application's data model.

### 8.2.1 Add the country filter button

Open the `index.html` file for editing. Search in the file for `italy-filter-button`.

Create a new line in the file below the comment and add an anchor (`a`) tag defining the filter button.

```html
<a id="SelectionButton" href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
  <i class="fas fa-filter fa-sm text-white-50"></i>Italy
</a>
```

Save the `index.html` file.

### 8.2.2 Select the value from the field

Open the `mashup.js` file for editing. Search in the file for `italy-filter-button`.

Create a new line in the file below the comment and add the code snippet. 

```js
$("#SelectionButton").click(async function() {
  let countryField = await app.getField("Country");
  await countryField.selectValues( {
    "qFieldValues": [
      {
        "qText": 'Italy'
      }
    ]
  });  
});
```

The click event executes a `getField` command on the `app` to work with the `"Country"` field in the data model. Then it calls the `selectValues` function passing in a JSON payload.

* `qFieldValues`: An array of objects representing values of the field being queried.
* `qText`: A string representing the value to be selected from the field in the data model being queried.

To select multiple field values, the JSON payload for the `selectValues` function would look like the following.

```js
{
  "qFieldValues": [
    {
      "qText": 'Italy'
    },
    {
      "qText": 'France'
    }
  ]
}
```

Save the `mashup.js` file.

Refresh the web application and the button appears in the web application. When you click on it, the embedded visualizations will filter to show information associated with Italy.
