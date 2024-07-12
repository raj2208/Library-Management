document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("libraryForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let bookTitle = event.target.bookTitle.value;
    let submissionTime = new Date();
    let bookDetails = { bookTitle, submissionTime };

    addToBorrowedBooks(bookDetails)
      .then((res) => {
        bookDetails.id = res.data.id;
        event.target.reset();
        addToList(bookDetails, "borrowed");
      })
      .catch((error) => {
        console.error(error);
      });
  });

  function addToList(bookDetails, type) {
    let li = document.createElement("li");

    let bookTitle = document.createElement("div");
    bookTitle.innerText = `Book Title: ${bookDetails.bookTitle}`;
    li.appendChild(bookTitle);

    if (type === "borrowed") {
      let borrowedAt = document.createElement("div");
      borrowedAt.innerText = `Borrowed At: ${convertToIST(
        bookDetails.submissionTime
      )}`;
      li.appendChild(borrowedAt);

      let returnTime = document.createElement("div");
      let returnDate = new Date(bookDetails.submissionTime);
      returnDate.setHours(returnDate.getHours() + 1);
      returnTime.innerText = `Book Return: ${convertToIST(returnDate)}`;
      li.appendChild(returnTime);

      let currentFine = document.createElement("div");
      currentFine.className = "currentFine";
      li.appendChild(currentFine);

      let returnButton = document.createElement("button");
      returnButton.innerText = "Return Book";
      returnButton.onclick = () => showPayOptions(bookDetails, li);

      li.appendChild(returnButton);
      document.getElementById("bookList").appendChild(li);

      updateFine(currentFine, bookDetails.submissionTime);
      setInterval(
        () => updateFine(currentFine, bookDetails.submissionTime),
        60000
      );
    } else if (type === "returned") {
      // let currentFine = document.createElement("div");
      // currentFine.className = "currentFine";
      // li.appendChild(currentFine);

      // updateFinee(
      //   currentFine,
      //   bookDetails.submissionTime,
      //   bookDetails.returnTime
      // );

      //....
      let returnedAt = document.createElement("div");
      returnedAt.innerText = `Returned on: ${convertToIST(
        bookDetails.returnTime
      )}`;
      li.appendChild(returnedAt);
      document.getElementById("returnedBooks").appendChild(li);
    }
  }

  function convertToIST(date) {
    let options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleString("en-IN", options);
  }

  function updateFine(fineElement, submissionTime) {
    let currentTime = new Date();
    let timeDifference =
      (currentTime - new Date(submissionTime)) / (1000 * 60 * 60); // Difference in hours
    let fine = timeDifference > 1 ? Math.floor(timeDifference - 1) * 10 : 0;
    fineElement.innerText = `Current Fine: ₹${fine}`;
  }
  // function updateFinee(fineElement, submissionTime, returnTime) {
  //   let timeDifference =
  //     (new Date(returnTime) - new Date(submissionTime)) / (1000 * 60 * 60); // Difference in hours
  //   let fine = timeDifference > 1 ? Math.floor(timeDifference - 1) * 20 : 0;
  //   fineElement.innerText = `Fine: ₹${fine}`;
  // }

  function showPayOptions(bookDetails, listItem) {
    let fineElement = listItem.querySelector(".currentFine");
    let fineText = fineElement.innerText.replace("Current Fine: ₹", "");
    let fine = parseInt(fineText);

    listItem.innerHTML = "";

    let fineInput = document.createElement("input");
    fineInput.type = "search";
    fineInput.value = `₹${fine}`;
    fineInput.disabled = true;
    listItem.appendChild(fineInput);

    let payButton = document.createElement("button");
    payButton.innerText = "Pay";
    payButton.onclick = () => payAndReturn(bookDetails, listItem);

    listItem.appendChild(payButton);
  }

  function payAndReturn(bookDetails, listItem) {
    deleteRecord(bookDetails.id, listItem)
      .then(() => {
        addToReturnedBooks(bookDetails);
        listItem.remove();
      })
      .catch((error) => {
        console.error("Error paying and returning book:", error);
      });
  }

  function addToReturnedBooks(bookDetails) {
    let returnTime = new Date();
    bookDetails.returnTime = returnTime;
    axios
      .post("http://localhost:4000/ReturnedBooks/add-book", bookDetails)
      .then(() => {
        addToList(bookDetails, "returned");
      })
      .catch((error) => {
        console.error("Error adding book to returned books:", error);
      });
  }

  function deleteRecord(id, listItem) {
    return axios.delete(`http://localhost:4000/BorrowedBooks/delete/${id}`);
  }

  function fetchAllBorrowedBooks() {
    axios
      .get("http://localhost:4000/BorrowedBooks/get-all-books")
      .then((res) => {
        res.data.forEach((bookDetails) => addToList(bookDetails, "borrowed"));
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
      });
  }

  function fetchAllReturnedBooks() {
    axios
      .get("http://localhost:4000/ReturnedBooks/get-all-books")
      .then((res) => {
        res.data.forEach((bookDetails) => addToList(bookDetails, "returned"));
      })
      .catch((error) => {
        console.error("Error fetching returned books:", error);
      });
  }

  fetchAllBorrowedBooks();
  fetchAllReturnedBooks();
});

function addToBorrowedBooks(bookDetails) {
  return axios.post(
    "http://localhost:4000/BorrowedBooks/add-book",
    bookDetails
  );
}
