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

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const pool = require("./db"); // Your PostgreSQL pool

// Express middleware
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: "secret-key", 
  resave: false, 
  saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Make current user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  next();
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM members WHERE email_address = $1",
        [email]
      );
      const user = rows[0];

      if (!user) return done(null, false, { message: "Incorrect email" });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.member_id));
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM members WHERE member_id = $1", [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});


const { ensureAuthenticated } = require("./middlewares/authMiddleware");

// Login page
app.get("/log-in", (req, res) => res.render("log-in"));

// Login POST
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
    failureFlash: true
  })
);

// Logout
app.get("/log-out", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});


app.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard"); // Only accessible if logged in
});



//routes

app.use("/", authRoutes);
app.get('/', (req, res) => res.render('index'))


app.listen(3000, () => console.log('Server running on https://localhost:3000'))