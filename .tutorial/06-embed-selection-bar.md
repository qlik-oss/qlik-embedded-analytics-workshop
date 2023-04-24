# 6 Embed the selections bar

One of the most common needs the users have during their analytics activities is to keep track about the context of selections they are applying to the data.

## 6.1 Add selection bar placeholder

Open the `index.html` file for editing. Search in the file for `selection-bar-entry`.

Create a new line in the file below the comment and add a `div` tag as a placeholder for the selection bar. 

```html
<div class="curr-selections" id="currentSelections" ></div>
```

Save the `index.html` file.

## 6.2 Render selection bar

Open the `mashup.js` file for editing. Search in the file for `selection-bar-entry`.

Create a new line in the file below the comment and mount the nebula `selections` component to the `div` tag placeholder.

```js
(await qlikEmbed.selections()).mount(document.querySelector('.curr-selections'));
```

Save the `mashup.js` file.

Refresh the web application and the selection bar appears at the top of the page. Click inside one of the embedded visualizations and make a selection. The selection bar will update with the current selections you've made.
