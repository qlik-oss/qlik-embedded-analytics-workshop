import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const port = 8080;
const app = express();
let config;
const featureEasyBake = true;

if(featureEasyBake) {
  config = await import("./easybake-config.js");
  app.use(express.static("easybake-src/src"));
} else {
  config = await import("./config.js");
  app.use(express.static("src"));
}

app.get("/", (request, response) => {
  if(featureEasyBake) {
    response.sendFile(`${__dirname}/easybake-src/index.html`);
  } else {
    response.sendFile(`${__dirname}/src/index.html`);
  }
  
});

app.get("/config", (request, response) => {
  response.json(config.default);
  response.end;
});

// app.get("/theme", (request, response) => {
//   response.json(theme);
//   response.end();
// });

app.listen(port, () => {
  console.log(`The workshop is running on port ${port}`);
});
