const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../db"); // <-- your PostgreSQL pool connection

exports.signup_get = (req, res) => {
  res.render("signup", { errors: [], oldInput: {} });
};

exports.signup_post = [
  // 1️⃣ Validate & sanitize
  body("firstName").trim().notEmpty().withMessage("First name required."),
  body("lastName").trim().notEmpty().withMessage("Last name required."),
  body("email")
    .isEmail().withMessage("Invalid email.")
    .normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password too short."),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),

  async (req, res) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array(), oldInput: req.body });
    }

    try {
      // 2️⃣ Check if email exists
      const existing = await pool.query("SELECT * FROM members WHERE email_address = $1", [email]);
      if (existing.rows.length > 0) {
        return res.render("signup", {
          errors: [{ msg: "Email already in use." }],
          oldInput: req.body
        });
      }

      // 3️⃣ Hash password
      const hashed = await bcrypt.hash(password, 10);

      // 4️⃣ Insert new user
      await pool.query(
        "INSERT INTO members (first_name, last_name, email_address, password_hash) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, hashed]
      );

      // 5️⃣ Redirect
      res.redirect("/auth/login");
    } catch (err) {
      console.error(err);
      res.render("signup", { errors: [{ msg: "Server error. Try again." }], oldInput: req.body });
    }
  }
];
