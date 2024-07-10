const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Raj@12345", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
