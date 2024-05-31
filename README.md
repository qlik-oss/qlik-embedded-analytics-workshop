# 1 Qlik Embedded Workshop Introduction

Welcome to this hands-on workshop on embedding visualizations from Qlik Cloud Analytics! In today's data-driven world, businesses need to quickly access and share insights from their data to make informed decisions. With Qlik Cloud Analytics, you can easily create powerful visualizations that enable you to explore your data and gain valuable insights.

In this workshop, we will guide you through the process of embedding visualizations from Qlik Cloud Analytics into your web applications, making it easier to share insights with your team or customers. You will learn how to leverage the Qlik Cloud Analytics APIs and embed codes to integrate visualizations directly into your web pages.

This workshop is designed for individuals with a basic understanding of web development, but no prior experience with Qlik Cloud Analytics is required. We'll start with some tenant configuration, then dive into the hands-on exercises where you will get to practice embedding visualizations into this web application.

By the end of this workshop, you will have the skills to integrate powerful data visualizations from Qlik Cloud Analytics into your web applications, allowing you to deliver insights to your stakeholders quickly and easily.

![MainImage](https://raw.githubusercontent.com/goldbergjeffrey/qlik-embedded-analytics-workshop-202304/main/img/final_result.png)

## Recommendations
* A Github account
* A Replit account for the best experience using this workshop.

## Requirements

* A Qlik Cloud tenant
* An account on the tenant with the Tenant Admin role
* A development environment such as Visual Studio Code or an online IDE like [repl.it](https://replit.com/).
* You are logged into the tenant as a user with access to the Qlik Cloud Analytics application

> **Note: This workshop does not cover authentication options for securing web applications with Qlik Cloud.**
> For more information on authentication and authorization for embedded applications [review the documentation](https://qlik.dev/authenticate) on [qlik.dev](https://qlik.dev).

> **Note:** This workshop is built to work on [repl.it](https://replit.com/). If you're going through this workshop with another online IDE or a local development environment, your mileage may vary.

## Workshop sections

- [1 Qlik Embedded Workshop Introduction](#1-qlik-embedded-workshop-introduction)
- [2 Configure the Qlik Cloud tenant](#2-configure-the-qlik-cloud-tenant)
- [3 Configure the web application](#3-configure-the-web-application)
- [4 Embed a complete analytics application](#4-embed-a-complete-analytics-application)
- [5 Embed charts and UI objects](#5-embed-charts-and-UI-objects)
- [6 Embed the selections bar](#6-embed-the-selections-bar)
- [7 Trigger events on analytics data](#7-trigger-events-on-analytics-data)

## 1.1 Install dependencies and start web application

### 1.1.1 Install npm packages

Open a terminal or shell window. At the prompt, enter the command `npm install`. This will install the dependencies for running the web application.

### 1.1.2 Start the web application

In the terminal or shell window, enter the command `npm run start` at the prompt. This will start the web application.

### 1.1.3 Obtain the web application address

When the Webview window appears, click on the green section of the address bar. This will reveal the Dev URL for the running web application. Record this value for later use.

<img src="../img/configuration/replitdevurl.png" width="300px" alt="replit dev url"></img>

# 2 Configure the Qlik Cloud tenant

## 2.1 Create a single-page application OAuth client

Select `OAuth` from the Management Console menu.

<img src="../img/configuration/oauthconnnew.png" width="200px" alt="oauth menu icon"></img>

Click the `Create new` button on the upper right side of the screen.

* From the `Client type` dropdown list, select *Single-page app*.
* In the `Name` input give your OAuth client a friendly name.
* *Optional:* In the `Description` input, add some information about the OAuth client.

### 2.1.1 Select OAuth client scopes

Select `user_default` within the Scopes selection window.

<img src="../img/configuration/oauthscopesuserdefault.png" width="400px" alt="scope selection"></img>

### 2.1.2 Add redirect URL

> **Note:** If you're using [repl.it](https://replit.com), the redirect URL is the address you obtained in [1.1.3](#113-obtain-the-web-application-address) with the addition of a location for the OAuth client should return to after the user authorizes, known as the callback page. The callback page for the tutorial is `oauth-callback.html`.

In the Redirect URLs input, enter the URL the OAuth client should redirect to and press the `Add` button.

<img src="../img/configuration/redirecturl.png" width="400px" alt="redirect url input"></img>

### 2.1.3 Add allowed origins

> **Note:** If you're using [repl.it](https://replit.com), the allowed origin is the address you obtained in [1.1.3](#113-obtain-the-web-application-address). Make sure to remove any trailing slashes at the end of the URL.

In the Allowed origins input, enter the URL for the web application and press the `Add` button.

<img src="../img/configuration/allowedorigin.png" width="400px" alt="allowed origin input"></img>

### 2.1.4 Obtain the OAuth client id

Press the `Create` button to save the OAuth client configuration. Record the Client ID value for later use.

<img src="../img/configuration/oauthclientid.png" width="400px" alt="oauth client id modal"></img>

## 2.2 Download content

Download the [Sales Analytics_Workshop.qvf](https://github.com/goldbergjeffrey/qlik-embedded-analytics-workshop/raw/main/content-to-upload/app/Sales%20Analytics_Workshop.qvf) file from the Github repository.

Download the [embeddedtheme.zip](https://github.com/goldbergjeffrey/qlik-embedded-analytics-workshop/raw/main/content-to-upload/theme/embeddedtheme.zip) file from the Github repository.

## 2.3 Import Qlik Sense app

Login to your Qlik Cloud tenant. When the hub appears, click the `Add new` button and select `Upload app` from the dropdown list.

<img src="../img/configuration/uploadapp.png" width="300px" alt="Upload app button"></img>

In the dialog window that appears, browse for the Sales Analytics_Workshop.qvf file and select it. Then, click the `Upload` button.

<img src="../img/configuration/uploaddialog.png" width="300px" alt="Upload dialog"></img>

A card for the app will appear in the hub. Mouse over the app and click the open button.

<img src="../img/configuration/appcard.png" width="300px" alt="Qlik Analytics application ref"></img>

Record the ID (highlighted) of the app from the address bar in your web browser. You will use this in the web application configuration later in the workshop.

![appId](../img/configuration/appguid.png)

## 2.4 Import theme file

Click the Launcher menu (it looks like a waffle on the upper right of the screen) and select the Management Console icon.

<img src="../img/configuration/mclogo.png" width="125px" alt="MC Logo"></img>

Select `Themes` from the Management Console menu.

<img src="../img/configuration/themeicon.png" width="200px" alt="theme menu icon"></img>

Click the `Add` button on the upper right side of the screen. Browse for the embeddedtheme.zip file you downloaded in [2.2](#22-download-content) and upload it to the tenant.

<img src="../img/configuration/themeupload.png" width="300px" alt="theme menu icon"></img>

# 3 Configure the web application

## 3.1 qlik-embed web components configuration script

When you use qlik-embed web components to embed analytics, a configuration script instructs the web page how to treat elements with the `<qlik-embed/>` tag. This script resides inside the `<head/>` section of the html web page you're adding embedded analytics. Here's an example of the script:

```html
<script
  crossorigin="anonymous"
  type="application/javascript"
  src="https://cdn.jsdelivr.net/npm/@qlik/embed-web-components"
  data-host="https://<TENANT_HOSTNAME>.<REGION>.qlikcloud.com"
  data-auth-type="Oauth2"
  data-client-id="<OAUTH_SPA_CLIENT_ID_FROM_TENANT>"
  data-redirect-uri="<WEB_APPLICATION_CALLBACK_PAGE>"
  data-access-token-storage="session"
  data-auto-redirect="true"
></script>
```

## 3.1.1 Set the qlik-embed configuration

Update these properties in the configuration script:

- `data-host`: The full hostname of your Qlik Cloud tenant including `https://`.
- `data-client-id`: The OAuth client id from the OAuth client you configured in [2.1](#21-create-a-single-page-application-oauth-client).
- `data-redirect-uri`: The URL for the oauth-callback.html page used in the application. This is Dev URL you obtained in step [1.1.3](#113-obtain-the-web-application-address) with `/oauth-callback.html` added to the end of the URL.

## 3.1.2 Copy paste the script configuration

Copy the modified script configuration.
Navigate to the `src` folder in the directory tree.
Inside each of the following files search for `BEGIN qlik-embed configuration`:

- index.html
- classic-app.html
- charts.html

In the config script section, paste the script configuration.

## 3.2 Configure the oauth-callback.html file

Open the `oauth-callback.html` file and set the `data-host` property to the full hostname of your Qlik Cloud tenant including `https://`.

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

## 5.3 Embed visualizations using expressions

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

# 6 Embed the selections bar

One of the most common needs the users have during their analytics activities is to keep track of the
selections they are applying to the data.

## 6.1 Add the selection bar to the web application

Open the `index.html` file for editing. Search in the file for `selection-bar-entry`.

Create a new line below the comment and add the selection bar snippet, replacing `<app-id>` with the application id you you obtained in step [2.3](#23-import-qlik-sense-app).

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

### 6.2 Apply a theme to the embedded application

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

### 6.3 Set a bookmark for the embedded application

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

### 6.4 Set a default selection for the embedded application

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

Set the `redirectUri` property in the `auth.setDefaultHostConfig` function to the same value as the `data-redirect-uri` property you configured in [3.1.1](#311-set-the-qlik-embed-configuration).

The `clearAll` function has been added to the code for your convenience. You can view the function in the `<script>` element at the bottom of the `index.html` page.

## 7.2 Select a specific field value

You can also contact the data model directly and apply selections to the embedded visualizations. In this section, you are going to add a button to the `index.html`. The selection button is connected to a function named `makeSelection` in the `<script>` section at the bottom of the html page.

### 7.2.1 Add the country filter button

Open the `index.html` file for editing. Search in the file for `italy-filter-button`.

Create a new line in the file below the comment and add an anchor (`a`) tag defining the filter button.

```html
<a id="SelectionButton" href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
  <i class="fas fa-filter fa-sm text-white-50"></i>Italy
</a>
```

Save the `index.html` file.

Refresh the web application and the button appears in the web application. When you click on it, the embedded visualizations will filter to show information associated with Italy.
