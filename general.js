const express = require("express");
const axios = require("axios");
const router = express.Router();

const BASE_URL = "http://localhost:5000/";

router.get("/books", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    const book = response.data[req.params.isbn];
    if (book) res.json(book);
    else res.status(404).json({ message: "Book not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/books/author/:author", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    const books = response.data;
    const result = [];

    for (let key in books) {
      if (books[key].author.toLowerCase() === req.params.author.toLowerCase()) {
        result.push({ isbn: key, ...books[key] });
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/books/title/:title", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    const books = response.data;
    const result = [];

    for (let key in books) {
      if (books[key].title.toLowerCase() === req.params.title.toLowerCase()) {
        result.push({ isbn: key, ...books[key] });
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
