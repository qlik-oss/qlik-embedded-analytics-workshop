# 2 Using `qlik-embed` to add an AI assistant to your web application

Here's a concise tutorial for working with the HTML in the **HTML Editor** and leveraging [Qlik Embed](https://qlik.dev/embed/qlik-embed/why-qlik-embed/) for embedding Qlik Answers where people work.

Qlik Embed is a powerful tool that allows you to seamlessly integrate Qlik user interfaces into web apps using just a few lines of HTML. It leverages modern web standards, minimal setup, and native embedding syntax to enable **real-time, low-code integration** with Qlik products.

## 2.1 What You’re Seeing in the HTML Editor

```html
<qlik-embed
  id="assistant"
  ui="ai/assistant"
  assistant-id="d57bb148-2499-4f2a-83b3-7a6597cd5e60"
  appearance="qlik-light"
></qlik-embed>
```

### 2.1.1 Here's a breakdown:

* **`<qlik-embed>`**: This is the custom web component provided by Qlik Embed for visualizing charts and KPIs directly in your app.
* **`id="assistant"`**: An HTML element ID, useful for DOM references.
* **`ui="ai/assistant"`**: Tells the component to render an ai assistant.
* **`assistant-id`**: Points to the Qlik Answers assistant to render in the web application.
* **`appearance="qlik-light"`**: Applies the "qlik-light" theme for consistent styling.

> If the assistant ID is invalid or misconfigured, you will see an error in the component's container on the page.

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

[![Step 3 button](https://img.shields.io/badge/Step_3--_Using_qlik--embed_to_Render_Visualizations_in_Real_Time_>-19426C?style=for-the-badge)](03-hello-qlikembed.md)
