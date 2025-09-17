const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",       // replace with your postgres username
  database: "top_users",
  password: "Ismail2006.,", // replace with your password
  port: 5432
})