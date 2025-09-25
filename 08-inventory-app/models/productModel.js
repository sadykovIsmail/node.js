const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Item = sequelize.define("Item", {
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

// Sync model with database
Item.sync()
  .then(() => console.log("Item table synced"))
  .catch((err) => console.error("Sync error:", err));

module.exports = Item;
