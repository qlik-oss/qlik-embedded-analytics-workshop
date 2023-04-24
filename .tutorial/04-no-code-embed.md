# 4 No-code embedded analytics

In this section, you are going to embed a sheet from a Qlik Sense application into the web application using an `<iframe>` tag.

In a web browser, navigate to your tenant and open the `Sales Analytics` app. This is the app you uploaded in step 2.4.

<img src="../img/configuration/appcard.png" width="150px" alt="Qlik Analytics application ref"></img>

In the app overview, click on the `Customers Overview` sheet.

<img src="../img/embed/customeroverview.png" width="150px" alt="Qlik Analytics application ref"></img>

When the sheet renders in the browser, click on the three dots button next to the Qlik logo and select `Embed sheet` from the menu.

<img src="../img/embed/embed-sheet-menu.png" width="150px" alt="Qlik Analytics application ref"></img>

The Embed sheet dialog appears. Bring your attention to the bottom of the dialog. This is where the embed code provided to you. The embed code contains all the information needed to render the sheet in your web application.

```html
<!-- example iframe embed code from Qlik Sense application -->
<iframe src="https://ironingboard.us.qlikcloud.com/single/?appid=599071c0-0de0-440c-bf8f-5b1a0a07ebcf&sheet=a8bdb8b2-525e-486e-91d1-7318d362acee&theme=embeddedtheme&opt=ctxmenu,currsel" style="border:none;width:100%;height:100%;"></iframe>
```

Press the `Copy` button to copy the code snippet to your clipboard. 

Open the `iframe.html` file of the workshop web application located in the `src` directory. Use the find command to search in the file for `no-code-embed`.

```html
<!-- begin no-code-embed exercise -->
            <iframe id="no-code-embed" src="" style="border:none;width:100%;height:100%;"></iframe>
<!-- end no-code-embed exercise -->
```

Replace the entire code snippet from `<iframe>` through `</iframe>` with the embed code from the application.

Save the `iframe.html` file.

Open the web application in its own tab by clicking on the square with arrow icon in the Webview address bar.

![open in new window ](../img/embed/newwindow.png)

In the web application, click the iframe menu item on the left side of the screen. The sheet from Qlik Sense appears in the web application.

>**Note:** The iframe content will not render in the Webview because of content security policy. This is why you need to open the application in a separate window.