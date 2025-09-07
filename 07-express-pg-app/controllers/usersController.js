const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames:", usernames);
  res.send("Usernames: " + usernames.map(u => u.username).join(", "));
}

async function createUsernameGet(req, res) {
  res.send(`
    <form action="/new" method="POST">
      <input name="username" type="text" placeholder="Enter username" />
      <button type="submit">Submit</button>
    </form>
  `);
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost
};
