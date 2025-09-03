const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "<role_name>",       // replace with your postgres username
  database: "top_users",
  password: "<role_password>", // replace with your password
  port: 5432
});

