const express = require('express');
const path = require('path');
const app = express();

// Serve static files

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contactme.html"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`New app listening on port ${PORT}`);
});
