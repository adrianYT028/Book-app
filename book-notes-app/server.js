const express = require("express");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();


const port = process.env.PORT || 3000;

// ✅ PostgreSQL Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// ✅ Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.set("view engine", "ejs");

// ✅ Debugging: Check if `.env` is loaded
console.log("Database Config:", {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS ? "****" : "Not set",
    port: process.env.DB_PORT,
});

// ✅ Home Route (Show All Books)
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books ORDER BY read_date DESC");
        res.render("index", { books: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ Search Books
app.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const result = await pool.query("SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1", [`%${query}%`]);
        res.render("index", { books: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Search Error");
    }
});

// ✅ Show Add Book Form
app.get("/add-book", (req, res) => {
    res.render("add-book");
});

// ✅ Add a New Book
app.post("/books", async (req, res) => {
    const { title, author, cover_url, rating, notes, read_date } = req.body;
    try {
        await pool.query(
            "INSERT INTO books (title, author, cover_url, rating, notes, read_date) VALUES ($1, $2, $3, $4, $5, $6)",
            [title, author, cover_url, rating, notes, read_date]
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding book");
    }
});

// ✅ Show Edit Book Form
app.get("/edit-book/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [req.params.id]);
        res.render("edit-book", { book: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching book details");
    }
});

// ✅ Update a Book
app.post("/edit-book/:id", async (req, res) => {
    const { title, author, cover_url, rating, notes, read_date } = req.body;
    try {
        await pool.query(
            "UPDATE books SET title=$1, author=$2, cover_url=$3, rating=$4, notes=$5, read_date=$6 WHERE id=$7",
            [title, author, cover_url, rating, notes, read_date, req.params.id]
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating book");
    }
});

// ✅ Delete a Book (AJAX or API call)
app.delete("/books/:id", async (req, res) => {
    console.log("Delete request received!"); // Debugging
    const bookId = req.params.id;

    try {
        const result = await pool.query("DELETE FROM books WHERE id = $1", [bookId]);

        if (result.rowCount > 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false, message: "Book not found" });
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

