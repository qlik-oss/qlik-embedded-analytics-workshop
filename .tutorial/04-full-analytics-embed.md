# 4 Embed a complete analytics application

In this section, you are going to embed a Qlik Analytics application into the web application using an `<qlik-embed>` tag.

## 4.1 Collect application metadata

### 4.1.1 Get the application Id

In a web browser, navigate to your tenant and open the `Sales Analytics` app. This is the app you uploaded in step [2.3](#23-import-qlik-sense-app).

<img src="../img/configuration/appcard.png" width="150px" alt="Qlik Analytics application ref"></img>

When the app overview appears, record the application Id from the address bar in your web browser. The application Id is thirty-six characters and looks like `ff345764-ee83-4488-8637-e93ddb7ccc47`.

### 4.1.2 Get the sheet Id

Select the Customer Overview sheet tile to open the analytics user experience.

<img src="../img/embed/customeroverview.png" width="150px" alt="Qlik Analytics application ref"></img>

In the address bar in your web browser, look for the word `sheet`. To the right is the Id for the sheet. Sheet Ids can be short or long, appearing like `ASdwY` or `fa5fc527-3717-4a90-88f0-c6e4638c60b0`. In all cases, the sheet id will be bookended by a forward slash `/`.

Record the sheet Id for later use.

### 4.1.3 Embed Qlik Sense into the web application

Open the file named `classic-app.html`. In this file, you will update a reference to a `qlik-embed` web component to render the Qlik Sense application in the web application.

Search for the line `begin classic/app exercise`. In the `qlik-embed` element, enter the `appId` and `sheetId` you recorded into the corresponding attributes.

Save the `classic-app.html` file.

Open the web application in its own tab by clicking on the square with arrow icon in the Webview address bar.

![open in new window ](../img/embed/newwindow.png)

In the web application, click the analytics menu item on the left side of the screen. The Qlik Sense application appears embedded in the window of the web application set to the specified sheet.

>**Note:** The application content will not render in the Webview because of cross-site scripting restrictions. This is why you need to open the web application in a separate window.

### 4.1.4 Apply a theme to the embedded application

To add a theme to the application you embedded, enter a new attribute within the `qlik-embed` element with the key `theme` and the value of 'embeddedTheme'. The updated `qlik-embed` element should look like this:

```html
<qlik-embed
  ui="classic/app"
  app-id="<APP_ID>"
  sheet-id="<SHEET_ID>"
  theme="embeddedTheme"
></qlik-embed>
```

Save the `classic-app.html` file and refresh the browser window showing the application.

### 4.1.5 Set a bookmark for the embedded application

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

### 4.1.6 Set a default selection for the embedded application

You can also add a default selection instead of a bookmark. Remove the bookmark property and add the `select:json` property. Set it equal to <TODO: add a selection string>. The updated `qlik-embed` element should look like this:

```html
<qlik-embed
  ui="classic/app"
  app-id="<APP_ID>"
  sheet-id="<SHEET_ID>"
  theme="embeddedTheme"
  select:json="[{field:'AccountDesc',values:['Claims','Commission']}]"
></qlik-embed>
```
