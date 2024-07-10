// Model/ReturnedBook.js
const Sequelize = require("sequelize");
const sequelize = require("../utll/database");

const ReturnedBook = sequelize.define("ReturnedBook", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  returnTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = ReturnedBook;
