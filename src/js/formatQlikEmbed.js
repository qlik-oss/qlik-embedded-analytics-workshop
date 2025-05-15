import prettier from 'https://cdn.jsdelivr.net/npm/prettier@3.2.5/+esm';
import prettierPluginBabel  from "https://unpkg.com/prettier@3.2.5/plugins/babel.mjs";
import prettierPluginEstree from "https://unpkg.com/prettier@3.2.5/plugins/estree.mjs";
import prettierPluginHtml from "https://unpkg.com/prettier@3.2.5/plugins/html.mjs";

async function formatQlikEmbed(srcElement,destId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(srcElement.outerHTML, 'text/html');
  // Remove the child element
  const parentElement = doc.querySelector('qlik-embed');
  console.log(parentElement)
  const childElement = parentElement.firstElementChild;
  if (childElement) {
    console.log("removing the child element");
      childElement.remove();
  }

  if(parentElement.hasAttribute("style")) {
    console.log("removing the style attribute");
    parentElement.removeAttribute("style");
  }

  let text2 = await prettier.format(parentElement.outerHTML, {
      parser: "html",
      plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
    singleAttributePerLine: true,
    singleQuote: true,
    });

  let text1 = text2.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  console.log(text1);
  
  let foo = document.getElementById(destId);
  foo.innerHTML = text1;

  foo.removeAttribute("data-highlighted");
  hljs.highlightElement(foo);
}

async function formatChartJs() {
  const unformattedCode = `
    const element = document.getElementById("visualization");
    const refApi = await element.getRefApi();
    const doc = await refApi.getDoc();
    const obj = await refApi.getObject();
    let objLayout = await obj.getLayout();

    //remove any existing data table;
    let remTable = document.getElementById("theDataTable");
    if(remTable) {
    remTable.remove();
    }

      let container = document.getElementById("chart-data");
      let table = document.createElement("table");
      table.id = "theDataTable";
      let cols = [objLayout.qHyperCube.qDimensionInfo[0].title, objLayout.qHyperCube.qMeasureInfo[0].title];
      let thead = document.createElement("thead");
      let tr = document.createElement("tr");
      cols.forEach((item) => {
        let th = document.createElement("th");
        th.textContent = item;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);
      let tBody = document.createElement("tbody");
      table.appendChild(tBody);
      container.appendChild(table);
      paintChart(objLayout.qHyperCube.qDataPages[0].qMatrix, table, tBody);

      // Register an event listener for change events
      obj.on("changed", async () => {
        objLayout = await obj.getLayout()
        paintChart(objLayout.qHyperCube.qDataPages[0].qMatrix, table, tBody);
        console.log("changed ✅");
      });


      function paintChart(theCube, table, tBody) {
        let newTBody = document.createElement("tbody");
        theCube.forEach((item) => {
          let tr = document.createElement("tr");
          let vals = Object.values(item);
          vals.forEach((elem) => {
            let td = document.createElement("td");
            td.textContent = elem.qText;
            tr.appendChild(td);
          });
          newTBody.appendChild(tr);
        });
        if (tBody != null) {
          table.replaceChild(newTBody, table.tBodies[0]);
        } else {
          table.appendChild(newTBody);
        }
      }
    `;

  let text = await prettier.format(unformattedCode, {
    parser: "babel",
      plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
    singleQuote: true,
      // semi: false,
      // trailingComma: "es5",
      tabWidth: 2,
  });

  return text;

}

export { formatQlikEmbed, formatChartJs};