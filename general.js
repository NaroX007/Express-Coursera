const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * TASK 2
 * Get all books using async/await + Axios
 */
router.get("/books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * TASK 3
 * Get book by ISBN using async/await + Axios
 */
router.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/");
    const books = response.data;
    const book = books[req.params.isbn];

    if (book) res.status(200).json(book);
    else res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * TASK 4
 * Get books by author using Promise + Axios
 */
router.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();

  axios
    .get("http://localhost:5000/")
    .then((response) => {
      const books = response.data;
      const result = [];

      Object.keys(books).forEach((isbn) => {
        if (books[isbn].author.toLowerCase() === author) {
          result.push({ isbn, title: books[isbn].title });
        }
      });

      if (result.length > 0) res.status(200).json(result);
      else res.status(404).json({ message: "No books found" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * TASK 5
 * Get books by title using Promise + Axios
 */
router.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();

  axios
    .get("http://localhost:5000/")
    .then((response) => {
      const books = response.data;
      const result = [];

      Object.keys(books).forEach((isbn) => {
        if (books[isbn].title.toLowerCase() === title) {
          result.push({ isbn, author: books[isbn].author });
        }
      });

      if (result.length > 0) res.status(200).json(result);
      else res.status(404).json({ message: "No books found" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
