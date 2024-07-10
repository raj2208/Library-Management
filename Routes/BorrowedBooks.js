const express = require("express");
const router = express.Router();
const borrowedBooksController = require("../Controller/borrowedBooksController");

router.post("/add-book", borrowedBooksController.addBook);
router.get("/get-all-books", borrowedBooksController.getAllBooks);
router.delete("/delete/:id", borrowedBooksController.deleteBook);

module.exports = router;
