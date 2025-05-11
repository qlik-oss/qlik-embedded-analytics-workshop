# 2 Using `qlik-embed` to Render Visualizations in Real Time

Here's a concise tutorial for working with the HTML in the **HTML Editor** and leveraging [Qlik Embed](https://qlik.dev/embed/qlik-embed/why-qlik-embed/) for interactive data visualization development.

Qlik Embed is a powerful tool that allows you to seamlessly integrate Qlik Sense visualizations into web apps using just a few lines of HTML. It leverages modern web standards, minimal setup, and native embedding syntax to enable **real-time, low-code integration** with Qlik’s visualization engine.

## 2.1 What You’re Seeing in the HTML Editor

```html
<qlik-embed
  id="visualization"
  ui="analytics/chart"
  app-id="599f245c-6f62-4a79-bfc2-7dc248c60a14"
  object-id="eZxDKp"
  theme="breeze"
  disable-cell-padding="true"
></qlik-embed>
```

### 2.1.1 Here's a breakdown:

* **`<qlik-embed>`**: This is the custom web component provided by Qlik Embed for visualizing charts and KPIs directly in your app.
* **`id="visualization"`**: An HTML element ID, useful for DOM references.
* **`ui="analytics/chart"`**: Tells the component to render an analytics chart.
* **`app-id`**: Points to the Qlik Sense app that holds the visualizations.
* **`object-id`**: Refers to the specific chart or object you want to embed. This must match a valid object ID from the Qlik app.
* **`theme="breeze"`**: Applies the "breeze" theme for consistent styling.
* **`disable-cell-padding="true"`**: Removes extra padding around the visualization.

> If the object ID or app ID is invalid or misconfigured, you will see an error in the preview pane — as shown in the current screenshot.

## 2.2 How to Dynamically Preview Visualizations

To preview different visualizations in real-time, follow these steps:

### 2.2.1 Browse the Left Panel (Sheet Tree)
   You'll see a tree structure organized by sheet titles like:

   * *Sales Overview*
   * *Sales by Categories*
   * *Customer Overview by Countries*

   Under each sheet, you'll find individual object entries. For example:

   ```
   • 98d82b5f-fbd4-405f-abcc-6fc79ae8ef64 (map)
   • ejNeB (kpi)
   ```

### 2.2.2 Copy the Object ID

   * Right-click or click the copy icon (📋) next to any object.
   * This will copy the object's ID to your clipboard.

### 2.2.3 Update the `object-id` in the HTML

   * In the HTML Editor, locate this line:

     ```html
     object-id="eZxDKp"
     ```
   * Replace `"eZxDKp"` with the ID you copied. For example:

     ```html
     object-id="ejNeB"
     ```

### 2.2.4 See the Update in the Preview Panel

   * The **Preview** panel on the right updates instantly.
   * If the ID is valid and exists in the specified app, the visualization will load and render.


## ✅ Conlusion: Why Use Qlik Embed?

According to [Qlik.dev](https://qlik.dev/embed/qlik-embed/why-qlik-embed/), Qlik Embed is ideal because:

* It uses **modern web components**, making integration intuitive and clean.
* It supports **context-aware embedding**, with dynamic theming and responsiveness.
* It provides **developer-friendly** tooling for real-time updates, theming, layout control, and interactivity.

---

## 2.3 🚀 Pro Tips

* Use `"ui"` values like `analytics/chart`, `classic/app`, or `ai/assistant` to embed different experiences from Qlik Cloud in your web applications.
* Make sure the `app-id` is correct for the object you're trying to embed when you're embedding from an analytics applicaiton.
* Enable the browser console logs to diagnose preview issues.

[![Step 3 button](https://img.shields.io/badge/Step_3--_Embed_a_complete_analytics_application_>-19426C?style=for-the-badge)](03-hello-classicapp.md)