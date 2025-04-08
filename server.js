import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const port = 3000;
const app = express();

app.use(express.static("src"));


app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/src/index.html`);
});

app.get("/config", (request, response) => {
  response.json(config);
  response.end;
});

// app.get("/theme", (request, response) => {
//   response.json(theme);
//   response.end();
// });

app.listen(port, () => {
  console.log(`The workshop is running on port ${port}`);
});
