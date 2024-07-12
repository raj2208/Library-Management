const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./utll/database");

const borrowedBooksRoute = require("./Routes/BorrowedBooks");
const returnedBooksRoute = require("./Routes/ReturnedBooks");

const BorrowedBook = require("./Model/BorrowedBook");
const ReturnedBook = require("./Model/ReturnedBook");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/BorrowedBooks", borrowedBooksRoute);

app.use("/ReturnedBooks", returnedBooksRoute);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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

// Some books!--->

// The 7 Habits of Highly Effective People
// Atomic Habits
// Daring Greatly
// Man's Search for Meaning
// The Power of Now
// You Are a Badass
// Invisible Women
// How to Win Friends and Influence People
// I Thought It Was Just Me (But It Isn't)
// The Body Keeps the Score
