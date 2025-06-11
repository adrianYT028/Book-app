const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all books
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books ORDER BY read_date DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Add a new book
router.post("/", async (req, res) => {
    const { title, author, cover_url, rating, notes, read_date } = req.body;
    try {
        const newBook = await pool.query(
            "INSERT INTO books (title, author, cover_url, rating, notes, read_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, author, cover_url, rating, notes, read_date]
        );
        res.json(newBook.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Update a book
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, cover_url, rating, notes, read_date } = req.body;
    try {
        const updatedBook = await pool.query(
            "UPDATE books SET title=$1, author=$2, cover_url=$3, rating=$4, notes=$5, read_date=$6 WHERE id=$7 RETURNING *",
            [title, author, cover_url, rating, notes, read_date, id]
        );
        res.json(updatedBook.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Delete a book
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM books WHERE id = $1", [id]);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
