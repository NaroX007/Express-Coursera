const express = require("express");
const router = express.Router();
let books = require("./booksdb.js");

/**
 * TASK 2
 * Get all books (ASYNC)
 */
router.get("/books", async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * TASK 3
 * Get book by ISBN (ASYNC)
 */
router.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * TASK 4
 * Get books by Author (PROMISE)
 */
router.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();

  new Promise((resolve, reject) => {
    const result = [];

    Object.keys(books).forEach((isbn) => {
      if (books[isbn].author.toLowerCase() === author) {
        result.push({ isbn, title: books[isbn].title });
      }
    });

    if (result.length > 0) resolve(result);
    else reject("No books found for this author");
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/**
 * TASK 5
 * Get books by Title (PROMISE)
 */
router.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();

  new Promise((resolve, reject) => {
    const result = [];

    Object.keys(books).forEach((isbn) => {
      if (books[isbn].title.toLowerCase() === title) {
        result.push({ isbn, author: books[isbn].author });
      }
    });

    if (result.length > 0) resolve(result);
    else reject("No books found for this title");
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/**
 * TASK 6
 * Get book review
 */
router.get("/books/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
      res.status(200).json(book.reviews);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
