# 7 Implement a custom theme

Custom themes enable the visualizations you're embedding into your web applications match your branding and styling guidelines.

Open the `mashup.js` file for editing. Search in the file for `fetch-theme`.

Create a new line below the comment and add a new variable to fetch the theme file you uploaded in step 2.5.

```js
const themeFile =  await fetch("theme").then((response) => response.json());
```

Search in the file for `theme-property`. Add the `theme` property to the `qlikEmbed` nebula object and load the fetched theme file.

```js
themes:[
  {
      id: 'custom_theme',
      load: () => Promise.resolve(themeFile),
  }
],
```

Search in the file for `context-property`. Add the `context` property to instruct the `qlikEmbed` renderer to use the custom theme.

```js
context: {
  theme: 'custom_theme',
  language: 'en-US',
},
```

Save the `mashup.js` file and refresh the web application in the browser. The visualizations colors will change to those specified in the theme.
