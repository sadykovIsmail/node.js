const { Pool } = require('pg')

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "inventory-app",
    password: "Ismail2006.,",
    port: 5432


})