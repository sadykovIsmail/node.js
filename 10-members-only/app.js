require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const nodemailer = require("nodemailer");
const { isLoggedIn, isMember } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const memberRoutes = require("./routes/members");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const pool = require("./db"); // PostgreSQL pool

const app = express();

// Temporary storage for membership codes
let membershipCodes = {};

// Nodemailer transporter (supports Gmail or SMTP)
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: parseInt(process.env.EMAIL_PORT) === 465, // true for 465, false otherwise
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Views & static
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Make current user and flash messages available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  next();
});

// Passport local strategy
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

// ================= ROUTES =================

// Home
app.get('/', (req, res) => res.render('index'));

// Login
app.get("/log-in", (req, res) => res.render("log-in"));
app.post(
  "/log-in",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureFlash: true
  }),
  (req, res) => res.redirect("/dashboard")
);

// Logout
app.get("/log-out", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Dashboard
app.get("/dashboard", isLoggedIn, (req, res) => {
  const showCodeForm = !req.user.membership_status;
  res.render("dashboard", {
    user: req.user,
    message: "",
    showCodeForm
  });
});

// Send membership email
async function sendMembershipEmail(toEmail, code) {
  const message = {
    from: `"Membership App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Membership Code",
    text: `Your membership code is: ${code}`,
    html: `<p>Your membership code is: <b>${code}</b></p>`
  };

  try {
    const info = await transport.sendMail(message);
    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

// Request membership code
app.post("/request-membership", isLoggedIn, async (req, res) => {
  const email = req.user.email_address?.trim();
  if (!email) {
    return res.render("dashboard", {
      user: req.user,
      message: "No email found for your account.",
      showCodeForm: true
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  membershipCodes[email] = code;

  try {
    await sendMembershipEmail(email, code);
    res.render("dashboard", { 
      user: req.user, 
      message: "Membership code sent to your email!", 
      showCodeForm: true
    });
  } catch (err) {
    res.render("dashboard", { 
      user: req.user, 
      message: "Failed to send code. Try again.", 
      showCodeForm: true
    });
  }
});

// Become member (verify code)
app.post("/become-member", isLoggedIn, async (req, res) => {
  const email = req.body.email?.trim();
  const code = req.body.code?.trim();

  if (!email || !code) {
    return res.render("dashboard", { 
      user: req.user, 
      message: "Please enter the code.", 
      showCodeForm: true 
    });
  }

  if (membershipCodes[email] && parseInt(code) === membershipCodes[email]) {
    try {
      await pool.query(
        "UPDATE members SET membership_status = true WHERE email_address = $1",
        [email]
      );
      req.user.membership_status = true;
      delete membershipCodes[email];

      res.render("dashboard", {
        user: req.user,
        message: "You are now a member!",
        showCodeForm: false
      });
    } catch (err) {
      console.error(err);
      res.render("dashboard", { 
        user: req.user, 
        message: "Failed to update membership. Try again.", 
        showCodeForm: true 
      });
    }
  } else {
    res.render("dashboard", { 
      user: req.user, 
      message: "Invalid code. Try again.", 
      showCodeForm: true 
    });
  }
});

// Members page
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
    res.render("members", { user: req.user, posts: result.rows });
  } catch (err) {
    res.render("members", { user: req.user, posts: [] });
  }
});

// Submit new post
app.post("/members", isMember, async (req, res) => {
  const { post_title, post_body } = req.body;
  if (!post_title || !post_body) return res.redirect("/members");

  try {
    await pool.query(
      "INSERT INTO club_posts (author_id, post_title, post_body) VALUES ($1, $2, $3)",
      [req.user.member_id, post_title, post_body]
    );
    res.redirect("/members");
  } catch (err) {
    res.redirect("/members");
  }
});

// Routes
app.use("/", authRoutes);
app.use("/members", memberRoutes);

// Start server
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://10.0.0.41:3000');
});

