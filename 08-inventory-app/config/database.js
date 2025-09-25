const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory-app", "postgres", "Ismail2006.,", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("Unable to connect:", err));

module.exports = sequelize;
