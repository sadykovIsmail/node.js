const express = require("express")
const path = require("node:path")

const app = express()


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("index", { 
        message: "Hello from EJS",
        users: ["Alice", "Bob", "Charlie"]
        })
})


app.listen(3001)