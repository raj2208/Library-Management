const express = require("express");
const router = express.Router();
const returnedBooksController = require("../Controller/returnedBooksController");

router.post("/add-book", returnedBooksController.addReturnedBook);
router.get("/get-all-books", returnedBooksController.getAllReturnedBooks);

module.exports = router;
