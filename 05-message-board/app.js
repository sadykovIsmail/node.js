const express = require("express")
const path = require("node:path")

const app = express()


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }));


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

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date()
  });

  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const id = req.params.id;
  const message = messages[id];

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { title: "Message Detail", message });
});



app.listen(3000)

