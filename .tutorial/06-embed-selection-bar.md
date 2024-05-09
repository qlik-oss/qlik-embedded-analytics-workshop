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
