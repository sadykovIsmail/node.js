const db = require("../db/queries");


async function getUsernames(req, res) {
    const usernames = await db.getAllUsernames()
    console.log("Username: ", usernames)
    res.send("Username: " + usernames.map(user => user.username).join(", "))
}

async function createUsernameGet(req, res) {
    res.send(`
        <form method="POST" action="/new">
        <label>Username:</label>
        <input type="text" name="username" required />
        <button type="submit">Add User</button>
        </form>
        `)
    
}

async function createUsernamePost(req, res) {
    const { username } = req.body
    console.log("username to be saved: ", username)
    await db.insertUsername(username)
    res.redirect("/")
    
}

module.exports = {
    getUsernames, 
    createUsernameGet, 
    createUsernamePost
}