import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const port = 3000;
const app = express();

app.use(express.static("src", {
  index: `${__dirname}/src/hello-answers.html`
}));


app.get("/", (request, response) => {

  response.sendFile(`${__dirname}/src/hello-answers.html`);
});

app.get("/config", (request, response) => {
  response.json(config);
  response.end;
});

app.get("/access-token", async (request, response) => {
  const accessToken = await fetch("https://awkoia47z5.execute-api.us-east-1.amazonaws.com/default/oauth-patterns-access-token");
  const token = await accessToken.text();
  response.send(token);
});

// app.get("/theme", (request, response) => {
//   response.json(theme);
//   response.end();
// });

app.listen(port, () => {
  console.log(`The workshop is running on port ${port}`);
});
