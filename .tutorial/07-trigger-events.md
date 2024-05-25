# 7 Trigger events on analytics data

You can do more than embed visualizations when you embed Qlik Cloud Analytics. The engine you connected to in step 5.1 enables you to execute functions and trigger events on the analytics data in the application directly.

## 7.1 Clear selections

For example, you can add a button to the web application that clears all of the selections that have been made.

<img src="../img/clear_filters.png" width="300" title="hover text"/>

To add a clear all selections function to the eraser button seen in the image above, open the `index.html` file and search for `clear-all` in the file.

### 7.1.1 Set the application id

Set the `appId` variable with the word `let` before it to the application id you obtained in in step [2.3](#23-import-qlik-sense-app).

>Note: Do not change the `<app-id>` in the if statement below. This checks to make sure there is a real value in `appId`.

### 7.1.2 Set the host configuration

Set the `host` property in the `auth.setDefaultHostConfig` function to the same value as the `data-host` property you configured in [3.1.1](#311-set-the-qlik-embed-configuration).

Set the `clientId` property in the `auth.setDefaultHostConfig` function to the same value as the `data-client-id` property you configured in [3.1.1](#311-set-the-qlik-embed-configuration).

The `clearAll` function has been added to the code for your convenience.

## 7.2 Select a specific field value

You can also contact the data model directly and apply selections to the embedded visualizations. In this section, you are going to add a button to the `index.html` page and connect it to a function in `mashup.js` that will select the field value "Italy" from the "Country" field in the analytics application's data model.

### 7.2.1 Add the country filter button

Open the `index.html` file for editing. Search in the file for `italy-filter-button`.

Create a new line in the file below the comment and add an anchor (`a`) tag defining the filter button.

```html
<a id="SelectionButton" href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="makeSelection()">
  <i class="fas fa-filter fa-sm text-white-50"></i>Italy
</a>
```

Save the `index.html` file.

Refresh the web application and the button appears in the web application. When you click on it, the embedded visualizations will filter to show information associated with Italy.