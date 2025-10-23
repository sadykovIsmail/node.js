// routes/members.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Middleware: Only logged-in users can access
function ensureAuthenticated(req, res, next) {
  if (req.user) return next();
  res.redirect("/log-in");
}

// GET Members page with posts
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const posts = await pool.query(`
      SELECT club_posts.post_id, club_posts.post_title, club_posts.post_body, club_posts.posted_at,
             members.first_name, members.last_name
      FROM club_posts
      JOIN members ON club_posts.author_id = members.member_id
      ORDER BY club_posts.posted_at DESC
    `);

    res.render("members", {
      user: req.user,
      posts: posts.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading posts");
  }
});

// POST a new post
router.post("/", ensureAuthenticated, async (req, res) => {
  const { post_title, post_body } = req.body;

  if (!post_title || !post_body) {
    return res.redirect("/members");
  }

  try {
    await pool.query(
      `INSERT INTO club_posts (author_id, post_title, post_body)
       VALUES ($1, $2, $3)`,
      [req.user.member_id, post_title, post_body]
    );
    res.redirect("/members");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error posting message");
  }
});

module.exports = router;
