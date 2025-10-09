require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const authRoutes = require("./routes/auth");

const app = express()


app.set('views', path.join(__dirname, 'views')); // Make sure this folder exists
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

//routes

app.use("/auth", authRoutes);
app.get('/', (req, res) => res.render('index'))


app.listen(3000, () => console.log('Server running on https://localhost:3000'))