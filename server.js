const express = require("express");
const https = require("https");
const fs = require("fs");
const port = 8080;

const app = express();
app.use(express.static("src"));

const config = require("./config/config");
const theme = require("./themes/custom_theme/theme");

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/src/index.html`);
});

app.get("/config", (request, response) => {
  response.json(config);
  response.end;
});

app.get("/theme", (request, response) => {
  response.json(theme);
  response.end();
});

https.createServer(app).listen(port, () => {
  console.log(`The workshop is running on port ${port}`);
});
