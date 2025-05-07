# 4 qlik-embed bonus section

One of the most common needs the users have during their analytics activities is to keep track of the
selections they are applying to the data.

## 4.1 Add the selection bar to the web application

Open the `index.html` file for editing. Search in the file for `selection-bar-entry`.

Create a new line below the comment and add the selection bar snippet, replacing `<app-id>` with the application id you you obtained in step [2.1](02-full-analytics-embed.md#2.1-Get-the-application-Id).

```html
<div class="curr-selections" id="currentSelections" >
  <qlik-embed 
    ui="selections" 
    app-id="<app-id>">
  </qlik-embed>
</div>
```

Save the `index.html` file.

Refresh the web application and the selection bar appears at the top of the page. Click inside one of the embedded visualizations and make a selection. The selection bar will update with the current selections you've made.

## 4.2 Apply a theme to the embedded application

Open the `classic-app.html` file for editing.

To add a theme to the application you embedded, enter a new attribute within the `qlik-embed` element with the key `theme` and the value of 'embeddedTheme'. The updated `qlik-embed` element should look like this:

```html
<qlik-embed
  ui="classic/app"
  app-id="<APP_ID>"
  sheet-id="<SHEET_ID>"
  theme="embeddedtheme"
></qlik-embed>
```

Save the `classic-app.html` file and refresh the browser window showing the application.

## 4.3 Set a bookmark for the embedded application

Open the `classic-app.html` file for editing.

Similar to adding a theme, you can add a reference to a bookmark from a Qlik Sense application in the `qlik-embed` element properties. Add a new attribute with the key `bookmark` and add a value for a bookmark in the embedded application. <TODO PROVIDE BOOKMARK ID> The updated `qlik-embed` element should look like this:

```html
<qlik-embed
  ui="classic/app"
  app-id="<APP_ID>"
  sheet-id="<SHEET_ID>"
  theme="embeddedTheme"
  bookmark="<BOOKMARK_ID>"
></qlik-embed>
```

Save the `classic-app.html` file and refresh the browser window showing the application.

## 4.4 Set a default selection for the embedded application

Open the `classic-app.html` file for editing.

You can also add a default selection instead of a bookmark. Remove the bookmark property and add the `select:json` property and value shown below.

```javacript
  select:json="[{field:'Customer',values:['Boombastic','Casual Clothing']}]"
```

The updated `qlik-embed` element should look like this:

```html
<qlik-embed
  ui="classic/app"
  app-id="<APP_ID>"
  sheet-id="<SHEET_ID>"
  theme="embeddedTheme"
  select:json="[{field:'Customer',values:['Boombastic','Casual Clothing']}]"
></qlik-embed>
```

Save the `classic-app.html` file and refresh the browser window showing the application.

[![Step 5 button](https://img.shields.io/badge/Step_5_--_Trigger_events_on_analytics_data_>-19426C?style=for-the-badge)](05-trigger-events.md)
