# 4 Using `qlik-embed` to Render Visualizations in Real Time

Here's a concise tutorial for working with the HTML in the **HTML Editor** and leveraging [Qlik Embed](https://qlik.dev/embed/qlik-embed/why-qlik-embed/) for interactive data visualization development.

Qlik Embed is a powerful tool that allows you to seamlessly integrate Qlik Sense visualizations into web apps using just a few lines of HTML. It leverages modern web standards, minimal setup, and native embedding syntax to enable **real-time, low-code integration** with Qlik’s visualization engine.

## 4.1 Identify the three panels

* **Side Panel** (left): shows **Sheet List** and **Theme List**, each item with a copy‑to‑clipboard icon.
* **HTML Editor** (top right): your live `<qlik-embed>` markup.
* **Preview** (bottom): instantly renders whatever you configure.

## 4.2 Understand the `<qlik-embed>` attributes

```html
<qlik-embed
  id="visualization"
  ui="classic/app"
  app-id="599f245c-6f62-4a79-bfc2-7dc248c60a14"
  theme="breeze"
  disable-cell-padding="true"
></qlik-embed>
```

* **`ui="classic/app"`**
  Embeds the full Qlik Sense Classic client experience into your page. Customers get:

  * Sheet navigation tabs
  * Story, Bookmark and Search panels
  * Exporting and snapshot tools
  * All context‐aware toolbar actions (selections, filtering, drilling, etc.)
* **`app-id`**: GUID of the target Qlik Sense app.
* **`theme`**: styling (e.g. Breeze, Horizon, Card, Sense).
* **`disable-cell-padding`**: fine‑tunes layout spacing.

## 4.3 Pick a sheet to display

In the **Sheet List**, click the name of the sheet you want (e.g. “Sales Overview”).

## 4.4 Copy its Sheet ID

Click the 📋 icon—this copies the sheet’s GUID (e.g. `ZxDKp`) to your clipboard.

## 4.5 Add the `sheet-id` property

Paste that GUID into your `<qlik-embed>` tag:

```html
<qlik-embed
  id="visualization"
  ui="classic/app"
  app-id="599f245c-6f62-4a79-bfc2-7dc248c60a14"
  sheet-id="ZxDKp"
  theme="breeze"
  disable-cell-padding="true"
></qlik-embed>
```

## 4.6 Swap in a new theme

1. In **Theme List**, click the 📋 next to “horizon.”
2. Update:

   ```html
   <qlik-embed
     …
     theme="horizon"
     …
   ></qlik-embed>
   ```

**Tip:** If you don’t need the Qlik Sense client, try `ui="analytics/chart"` or `ui="analytics/sheet"`. Those modes embed only the charts or sheets without the full toolbar and story panels—ideal for more focused dashboards.

[![Step 5 button](https://img.shields.io/badge/Step_5--_configure_menus_for_embedded_objects_>-19426C?style=for-the-badge)](05-configure-context-menu.md)
