const ReturnedBook = require("../Model/ReturnedBook");

exports.addReturnedBook = (req, res) => {
  ReturnedBook.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error adding returned book:", error);
      res.status(500).json({ error: "Error adding returned book" });
    });
};

exports.getAllReturnedBooks = (req, res) => {
  ReturnedBook.findAll()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error("Error fetching returned books:", error);
      res.status(500).json({ error: "Error fetching returned books" });
    });
};
