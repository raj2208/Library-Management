const Sequelize = require("sequelize");
const sequelize = require("../utll/database");

const BorrowedBook = sequelize.define("BorrowedBook", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  submissionTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = BorrowedBook;
