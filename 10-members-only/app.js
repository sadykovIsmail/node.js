require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const authRoutes = require("./routes/auth");
const { isLoggedIn, isMember } = require("./middleware/auth");
const app = express()
const { checkAuthenticated } = require("./middleware/auth");
const memberRoutes = require("./routes/members");


app.set('views', path.join(__dirname, 'views')); // Make sure this folder exists
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
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



// Login page
app.get("/log-in", (req, res) => res.render("log-in"));

// Login POST
app.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureFlash: true
  }),
  (req, res) => {
    // After login, redirect to dashboard
    res.redirect("/dashboard");
  }
);



// Logout
app.get("/log-out", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Example: make a user a member (could be admin only)
app.post("/become-member", isLoggedIn, async (req, res) => {
  try {
    await pool.query(
      "UPDATE members SET membership_status = TRUE WHERE member_id = $1",
      [req.user.member_id]
    );
    req.user.membership_status = true; // update session
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error upgrading membership");
  }
});


// Handle new post submission
app.post("/members", isMember, async (req, res) => {
  const { post_title, post_body } = req.body;

  if (!post_title || !post_body) {
    return res.redirect("/members");
  }

  try {
    await pool.query(
      "INSERT INTO club_posts (author_id, post_title, post_body) VALUES ($1, $2, $3)",
      [req.user.member_id, post_title, post_body]
    );
    res.redirect("/members"); // reload page to show new post
  } catch (err) {
    console.error("Error inserting post:", err);
    res.redirect("/members");
  }
});



// Members page (protected)
app.get("/members", isMember, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cp.post_id,
             cp.post_title,
             cp.post_body,
             cp.posted_at,
             m.first_name,
             m.last_name
      FROM club_posts cp
      JOIN members m ON cp.author_id = m.member_id
      ORDER BY cp.posted_at DESC
    `);

    const posts = result.rows;
    res.render("members", { user: req.user, posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.render("members", { user: req.user, posts: [] });
  }
});









app.get("/dashboard", isLoggedIn, (req, res) => {
  res.render("dashboard", { user: req.user });
});


//routes

app.use("/", authRoutes);
app.get('/', (req, res) => res.render('index'))
 
app.use("/members", memberRoutes);


app.listen(3000, () => console.log('Server running on https://localhost:3000'))