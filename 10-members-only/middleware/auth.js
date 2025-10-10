// Check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/log-in");
}

// Check if user is a member
function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.membership_status) return next();
  res.status(403).send("Access denied. Members only.");
}

module.exports = { isLoggedIn, isMember };

