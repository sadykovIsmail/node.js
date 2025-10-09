const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../db"); // <-- your PostgreSQL pool connection

// Show the sign-up page
exports.signup_get = (req, res) => {
  res.render("sign-up", { error: [] });
};

// Handle form submission
exports.signup_post = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate here if needed
    // e.g., check empty fields or password length

    // Hash password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database (adjust according to your table)
    const pool = require("../db");
    await pool.query(
      "INSERT INTO members (first_name, last_name, email_address, password_hash) VALUES ($1,$2,$3,$4)",
      [firstName, lastName, email, hashedPassword]
    );

    res.redirect("/log-in");
  } catch (err) {
    console.error(err);
    res.render("sign-up", { error: ["Something went wrong"] });
  }
};
