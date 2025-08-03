const express = require("express")
const path = require("node:path")

const app = express()


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/", (req, res) => {
res.render("index", {title: "Mini Messageboard", messages: messages})

})

