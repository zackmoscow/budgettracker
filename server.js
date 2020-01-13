const express = require("express");
const logger = require("morgan");
const path = require('path');

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
  
app.get('/chart', (req, res) => {
  res.sendFile(path.join(__dirname, '/chart.html'));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


