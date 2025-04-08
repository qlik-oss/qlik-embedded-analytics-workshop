#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { config } from 'process';
const __dirname = dirname(new URL(import.meta.url).pathname);

//data-host="https://0xnu8fry2fgj2i4.us.qlikcloud.com"

// File path to the HTML file
const filePath = path.join(__dirname, '../src/oauth-callback.html');

function updateOAuthCallback(newHost) {

  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Replace the data-host parameter
    const updatedData = data.replace(
      /data-host="[^"]*"/,
      `data-host="${newHost}"`
    );

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
        return;
      }
      console.log('data-host parameter updated successfully!');
    });
  });

}

function createConfigFile(configData) {

  config.host = removeTrailingSlash(configData.host);
  config.codespaceHostname = configData.codespaceHostname;
  config.clientId = configData.clientId;
  config.redirectUri = configData.codespaceHostname + 'oauth-callback.html';
  config.appId = configData.appId;
  config.sheetId = configData.sheetId;

  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf-8');
  console.log('config.json updated successfully!');
}

function removeTrailingSlash(string) {
  if (string && string.endsWith('/')) {
    return string.slice(0, -1);
  }
  return string;
}

export { createConfigFile, updateOAuthCallback };