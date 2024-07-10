const BorrowedBook = require("../Model/BorrowedBook");

exports.addBook = (req, res) => {
  BorrowedBook.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error adding borrowed book:", err);
      res.status(500).json({ error: "Failed to add borrowed book" });
    });
};

exports.getAllBooks = (req, res) => {
  BorrowedBook.findAll()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.error("Error fetching borrowed books:", err);
      res.status(500).json({ error: "Failed to fetch borrowed books" });
    });
};

exports.deleteBook = (req, res) => {
  let id = req.params.id;
  BorrowedBook.destroy({
    where: {
      id: id,
    },
  })
    .then((numDeleted) => {
      if (numDeleted === 1) {
        res.json("Record deleted successfully.");
      } else {
        res.json("Record not found or not deleted.");
      }
    })
    .catch((err) => {
      console.error("Error deleting borrowed book:", err);
      res.status(500).json({ error: "Failed to delete borrowed book" });
    });
};
