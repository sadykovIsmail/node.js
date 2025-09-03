const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
