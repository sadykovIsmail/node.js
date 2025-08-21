// controllers/usersController.js
const usersStorage = require("../storages/usersStorage"); // 1

// show list of users
exports.usersListGet = (req, res) => {                   // 2
  const users = usersStorage.getUsers();                  // 3
  res.render("index", { title: "User list", users });     // 4
};

// show the create-user form
exports.usersCreateGet = (req, res) => {                  // 5
  res.render("createUser", { title: "Create user" });     // 6
};

// handle create form submission
exports.usersCreatePost = (req, res) => {                 // 7
  const { firstName, lastName, email, age, bio } = req.body; // 8
  usersStorage.addUser({ firstName, lastName, email, age, bio }); // 9
  res.redirect("/");                                      // 10
};

// show update form for a specific user
exports.usersUpdateGet = (req, res) => {                  // 11
  const user = usersStorage.getUser(req.params.id);       // 12
  if (!user) return res.status(404).send("User not found"); // 13
  res.render("updateUser", { title: "Update user", user }); // 14
};

// handle update form submit
exports.usersUpdatePost = (req, res) => {                 // 15
  const user = usersStorage.getUser(req.params.id);       // 16
  if (!user) return res.status(404).send("User not found"); // 17
  const { firstName, lastName, email, age, bio } = req.body; // 18
  usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio }); // 19
  res.redirect("/");                                      // 20
};

// handle delete request
exports.usersDeletePost = (req, res) => {                 // 21
  usersStorage.deleteUser(req.params.id);                 // 22
  res.redirect("/");                                      // 23
};
