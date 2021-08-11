const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const libro = sequelize.define("libros", {
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
  fecha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = libro;
