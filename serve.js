"use strict";

const express = require('express');
const fse = require('fs-extra');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  const filePath = path.join(__dirname, '/./', req.url);
  fse.exists(filePath, exists => {
    if (exists) {
      console.log(`Serving ${filePath}`);
      res.sendFile(filePath);
    } else {
      console.log(`404 for ${filePath}`);
      next();
    }
  });
});

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname, '/index.html');
  fse.exists(filePath, exists => {
    if (exists) {
      console.log(`Serving ${filePath}`);
      res.sendFile(filePath);
    } else {
      console.log(`404 for ${filePath}`);
      next();
    }
  });
});

const port = 80 || process.env.PORT; 

console.log(`Server is up and running on port: ${port}`);
app.listen(port);

/** Get any file in public directory */
