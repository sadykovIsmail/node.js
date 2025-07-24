const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const links = [{ href: "/", text: "Home" }, { href: "/about", text: "About" }];
const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
  res.render("index", { message: "Welcome to EJS!", links, users });
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
