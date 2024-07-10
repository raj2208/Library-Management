// Routes/ReturnedBooks.js
const express = require("express");
const router = express.Router();
const ReturnedBook = require("../Model/ReturnedBook");

// Add a returned book
router.post("/add-book", (req, res) => {
  ReturnedBook.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error adding returned book:", error);
      res.status(500).json({ error: "Error adding returned book" });
    });
});

// Get all returned books
router.get("/get-all-books", (req, res) => {
  ReturnedBook.findAll()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error("Error fetching returned books:", error);
      res.status(500).json({ error: "Error fetching returned books" });
    });
});

module.exports = router;
