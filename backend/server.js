const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// Security headers for production
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}

const port = process.env.PORT || 3000;

// ✅ PostgreSQL Connection
const pool = require('./db'); // ✅ From your new db.js file

// ✅ Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.static(path.join(__dirname, "../frontend/public"))); // Serve static files from frontend
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views")); // Set views directory to frontend

// Session middleware
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'strict' // CSRF protection
    }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// ✅ Debugging: Check if `.env` is loaded
console.log("Database Config:", {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS ? "****" : "Not set",
    port: process.env.DB_PORT,
});

// ✅ Authentication Routes
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
            [username, email, hashedPassword]
        );
        req.session.userId = result.rows[0].id;
        req.session.username = username;
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.render("register", { error: "User already exists or invalid data" });
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                req.session.userId = user.id;
                req.session.username = user.username;
                res.redirect("/");
            } else {
                res.render("login", { error: "Invalid credentials" });
            }
        } else {
            res.render("login", { error: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.render("login", { error: "Server error" });
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

// ✅ Home Route (Show All Books)
app.get("/", requireAuth, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books WHERE user_id = $1 ORDER BY read_date DESC", [req.session.userId]);
        res.render("index", { books: result.rows, username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// ✅ Search Books
app.get("/search", requireAuth, async (req, res) => {
    const { query } = req.query;
    try {
        const result = await pool.query("SELECT * FROM books WHERE user_id = $1 AND (title ILIKE $2 OR author ILIKE $2)", [req.session.userId, `%${query}%`]);
        res.render("index", { books: result.rows, username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).send("Search Error");
    }
});

// ✅ Show Add Book Form
app.get("/add-book", requireAuth, (req, res) => {
    res.render("add-book", { username: req.session.username, error: null });
});

// ✅ Add a New Book
app.post("/books", requireAuth, async (req, res) => {
    const { title, author, cover_url, rating, notes, read_date } = req.body;
    
    // Basic validation
    if (!title || !author) {
        return res.render("add-book", { 
            username: req.session.username, 
            error: "Title and Author are required fields" 
        });
    }
    
    try {
        // Convert empty strings to null for database
        const bookData = {
            title: title.trim(),
            author: author.trim(),
            cover_url: cover_url && cover_url.trim() ? cover_url.trim() : null,
            rating: rating && rating !== '' ? parseInt(rating) : null,
            notes: notes && notes.trim() ? notes.trim() : null,
            read_date: read_date && read_date !== '' ? read_date : null,
            user_id: req.session.userId
        };
        
        console.log('📚 Adding new book:', bookData); // Debug log
        
        await pool.query(
            "INSERT INTO books (title, author, cover_url, rating, notes, read_date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [bookData.title, bookData.author, bookData.cover_url, bookData.rating, bookData.notes, bookData.read_date, bookData.user_id]
        );
        
        console.log('✅ Book added successfully'); // Debug log
        res.redirect("/");
    } catch (err) {
        console.error('❌ Error adding book:', err);
        res.render("add-book", { 
            username: req.session.username, 
            error: "Database error: " + err.message 
        });
    }
});

// ✅ Show Edit Book Form
app.get("/edit-book/:id", requireAuth, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books WHERE id = $1 AND user_id = $2", [req.params.id, req.session.userId]);
        res.render("edit-book", { book: result.rows[0], username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching book details");
    }
});

// ✅ Update a Book
app.post("/edit-book/:id", requireAuth, async (req, res) => {
    const { title, author, cover_url, rating, notes, read_date } = req.body;
    try {
        await pool.query(
            "UPDATE books SET title=$1, author=$2, cover_url=$3, rating=$4, notes=$5, read_date=$6 WHERE id=$7 AND user_id=$8",
            [title, author, cover_url, rating, notes, read_date, req.params.id, req.session.userId]
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating book");
    }
});

// ✅ Delete a Book (AJAX or API call)
app.delete("/books/:id", requireAuth, async (req, res) => {
    console.log("Delete request received!"); // Debugging
    const bookId = req.params.id;

    try {
        const result = await pool.query("DELETE FROM books WHERE id = $1 AND user_id = $2", [bookId, req.session.userId]);

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
