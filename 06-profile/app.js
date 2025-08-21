// app.js
const express = require("express");                 // 1
const path = require("path");                       // 2
const app = express();                              // 3

// parse application/x-www-form-urlencoded (HTML form data)
app.use(express.urlencoded({ extended: true }));    // 4

// static files (css, client-side js, images) served from 'public' folder
app.use(express.static(path.join(__dirname, "public"))); // 5

// set where views live and which template engine to use
app.set("views", path.join(__dirname, "views"));    // 6
app.set("view engine", "ejs");                      // 7

// mount our routes (import router that defines endpoints)
const usersRouter = require("./routes/usersRouter"); // 8
app.use("/", usersRouter);                           // 9

// default port configuration and start server
const PORT = process.env.PORT || 3000;              // 10
app.listen(PORT, (err) => {                         // 11
  if (err) throw err;                               // 12
  console.log(`Express app listening on port ${PORT}!`); // 13
});
