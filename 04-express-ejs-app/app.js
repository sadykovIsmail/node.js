const express = require('express');
const path = require('node:path');
const app = express();

app.set('views', path.join(__dirname, 'views')); // tell Express where views are
app.set('view engine', 'ejs'); // set EJS as engine
app.get("/", (req, res) => {
  res.render("index", { message: "EJS rocks!" });
});


