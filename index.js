const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./utll/database");

// Routes
const borrowedBooksRoute = require("./Routes/BorrowedBooks");
const returnedBooksRoute = require("./Routes/ReturnedBooks");

// Models
const BorrowedBook = require("./Model/BorrowedBook");
const ReturnedBook = require("./Model/ReturnedBook");

app.use(bodyParser.json());

// Borrowed Books routes
app.use("/BorrowedBooks", borrowedBooksRoute);

// Returned Books routes
app.use("/ReturnedBooks", returnedBooksRoute);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "View", "index.html"));
});

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
    app.listen(4000, () => {
      console.log("Server is running on http://localhost:4000");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
