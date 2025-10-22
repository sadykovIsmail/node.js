const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const app = express();

// setup ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// home
app.get("/", (req, res) => {
res.render("login")
});

// show signup form
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => res.render("login"));



// handle signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // create user in database
    const newUser = await prisma.user.create({
      data: { email, password },
    });

    res.send(`User ${newUser.email} created successfully!`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user.");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
