# 6 Embed a complete analytics application into a proper web application

In this section, you are going to embed a Qlik Analytics application into the web application using an `<qlik-embed>` tag.

## 6.1 Get the application Id

In a web browser, navigate to your tenant and open the `Sales Analytics` app in the **Staging** space.

<img src="../img/configuration/appcard.png" width="150px" alt="Qlik Analytics application ref"></img>

When the app overview appears, record the application Id from the address bar in your web browser. The application Id is thirty-six characters and looks like `ff345764-ee83-4488-8637-e93ddb7ccc47`.

## 6.2 Get the sheet Id

Select the Customer Overview sheet tile to open the analytics user experience.

<img src="../img/embed/customeroverview.png" width="150px" alt="Qlik Analytics application ref"></img>

In the address bar in your web browser, look for the word `sheet`. To the right is the Id for the sheet. Sheet Ids can be short or long, appearing like `ASdwY` or `fa5fc527-3717-4a90-88f0-c6e4638c60b0`. In all cases, the sheet id will be bookended by a forward slash `/`.

Record the sheet Id for later use.

## 6.3 Embed Qlik Sense into the web application

In the codespace editor, open the file named `classic-app.html`. In this file, you will update a reference to a `qlik-embed` web component to render the Qlik Sense application in the web application.

Search for the line `begin classic/app exercise`. In the `qlik-embed` element, enter the `appId` and `sheetId` you recorded into the corresponding attributes.

Save the `classic-app.html` file.

Open the web application in its own tab by clicking on the square with arrow icon in the Webview address bar.

![open in new window ](../img/embed/newwindow.png)

In the web application, click the analytics menu item on the left side of the screen. The Qlik Sense application appears embedded in the window of the web application set to the specified sheet.

>**Note:** The application content will not render in the Webview because of cross-site scripting restrictions. This is why you need to open the web application in a separate window.

[![Step 7 button](https://img.shields.io/badge/Step_7_--_Embed_charts_and_UI_objects_>-19426C?style=for-the-badge)](07-object-ui-embed.md)
