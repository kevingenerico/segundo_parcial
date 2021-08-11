const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const editor = sequelize.define("editores", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pais: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = editor;
