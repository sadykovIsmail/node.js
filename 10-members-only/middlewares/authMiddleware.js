// middlewares/authMiddleware.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in"); // redirect if not logged in
}

module.exports = { ensureAuthenticated };
