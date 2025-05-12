# 5 Trigger events on analytics data

You can do more than embed visualizations when you embed Qlik Cloud Analytics. The engine you connected to in step 5.1 enables you to execute functions and trigger events on the analytics data in the application directly.

> Note: The workshop has been optimized to read from the `config.js` file generated in step [1](01-config-env). Steps 5.1.1 and 5.1.2 describe how to configure the host information manually.

## 5.1 Clear selections

For example, you can add a button to the web application that clears all of the selections that have been made.

<img src="../img/clear_filters.png" width="300" title="hover text"/>

### 5.1.1 Set the application id

Set the `appId` variable with the word `let` before it to the application id you obtained in in step [2.1](02-full-analytics-embed.md#2.1-Get-the-application-Id).

### 5.1.2 Set the host configuration

Set the `host` property in the `auth.setDefaultHostConfig` function to the same value as the `host` property you can find in the `config.js`file.

Set the `clientId` property in the `auth.setDefaultHostConfig` function to the same value as the `clientId` property you in the `config.js`file.

Set the `redirectUri` property in the `auth.setDefaultHostConfig` function to the same value as the `redirectUri` property in the `config.js`file.

The `clearAll` function has been added to the code for your convenience. You can view the function in the `<script>` element at the bottom of the `index.html` page.

## 5.2 Select a specific field value

You can also contact the data model directly and apply selections to the embedded visualizations. In this section, you are going to add a button to the `index.html`. The selection button is connected to a function named `makeSelection` in the `<script>` section at the bottom of the html page.

### 5.2.1 Add the country filter button

Open the `index.html` file for editing. Search in the file for `italy-filter-button`.

Create a new line in the file below the comment and add an anchor (`a`) tag defining the filter button.

```html
<a id="SelectionButton" href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
  <i class="fas fa-filter fa-sm text-white-50"></i>Italy
</a>
```

Save the `index.html` file.

Refresh the web application and the button appears in the web application. When you click on it, the embedded visualizations will filter to show information associated with Italy.

[![Step 6 button](https://img.shields.io/badge/Step_6_--_Set_charts_on_the_fly_>-19426C?style=for-the-badge)](06-set-charts-on-the-fly.md)
