import express from 'express';

const port = 8080;

const app = express();

const featureEasyBake = false;

let config;
if (featureEasyBake) {
  config = await import('./easybake-config.js');
  app.use(express.static("easybake-src"));
} else {
  config = await import('./config.js');
  app.use(express.static("src"));
}

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/src/index.html`);
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
