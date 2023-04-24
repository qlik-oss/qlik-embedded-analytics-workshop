# 2 Configure the Qlik Cloud tenant

## 2.1 Create a web integration

Select `Web` from the Management Console menu.

<img src="../img/configuration/webiconnew.png" width="200px" alt="web menu icon"></img>

Click the `Create new` button on the upper right side of the screen.

* In the `Name` input give your web integration a friendly name.
* In the `Add an origin` input enter the host URI for your web application.

> **Note:** If you're using [repl.it](https://replit.com), the origin you add will look something like this: `https://qlik-embedded-workshop.makethelogobigger.repl.co`.

* Click the Add button to set the origin as an allowed origin for this web integration.
* Click the Create button on the bottom right to create the web integration reference.

The configuration will look like this when it's complete.

<img src="../img/configuration/webintegrationconfig.png" width="300px" alt="web menu icon"></img>

An entry for the web integration will appear in the list in the middle of the screen. Record the web integration id value for use with the web application.

## 2.2 Add content security policy entry

Select `Content Security Policy` from the Management Console menu.

<img src="../img/configuration/csplogo.png" width="300px" alt="web menu icon"></img>

Click the create `Add` button on the upper right side of the screen. The Add origin dialog window appears.

* Provide a name for the entry.
* In the `Origin` input enter the host URI for your web application **omitting** the `https://` from the entry. If your origin is *https://qlik-embedded-workshop.makethelogobigger.repl.co*, enter `qlik-embedded-workshop.makethelogobigger.repl.co` into the field.
* Select the checkbox next to `frame-ancestors` to activate the directive to allow iframe content from Qlik Cloud to be embedded into your web application.
* Click the Add button to save the entry.

The configuration will look like this when it's complete.

<img src="../img/configuration/cspconfiguration.png" width="400px" alt="web menu icon"></img>

>**Note:** Please complete the steps below if the workshop application and embedded theme have not been added to your tenant. Otherwise, proceed to configure the web application.

## 2.3 Download content

Download the [Sales Analytics_Workshop.qvf](https://github.com/goldbergjeffrey/qlik-embedded-analytics-workshop/raw/main/content-to-upload/app/Sales%20Analytics_Workshop.qvf) file from the Github repository.

Download the [embeddedtheme.zip](https://github.com/goldbergjeffrey/qlik-embedded-analytics-workshop/raw/main/content-to-upload/theme/embeddedtheme.zip) file from the Github repository.

## 2.4 Import Qlik Sense app

Login to your Qlik Cloud tenant. When the hub appears, click the `Add new` button and select `Upload app` from the dropdown list.

<img src="../img/configuration/uploadapp.png" width="300px" alt="Upload app button"></img>

In the dialog window that appears, browse for the Sales Analytics_Workshop.qvf file and select it. Then, click the `Upload` button.

<img src="../img/configuration/uploaddialog.png" width="300px" alt="Upload dialog"></img>

A card for the app will appear in the hub. Mouse over the app and click the open button.

<img src="../img/configuration/appcard.png" width="300px" alt="Qlik Analytics application ref"></img>

Record the ID (highlighted) of the app from the address bar in your web browser. You will use this in the web application configuration later in the workshop.

![appId](../img/configuration/appguid.png)

## 2.5 Import theme file

Click the Launcher menu (it looks like a waffle on the upper right of the screen) and select the Management Console icon.

<img src="../img/configuration/mclogo.png" width="125px" alt="MC Logo"></img>

Select `Themes` from the Management Console menu.

<img src="../img/configuration/themeicon.png" width="200px" alt="theme menu icon"></img>

Click the `Add` button on the upper right side of the screen. Browse for the embeddedtheme.zip file you downloaded in [2.1](#21-download-content) and upload it to the tenant.

<img src="../img/configuration/themeupload.png" width="300px" alt="theme menu icon"></img>
