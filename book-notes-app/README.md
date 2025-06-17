# 📚 Book Notes App

A minimalist web application to **track books you've read**, take notes, give ratings, and manage your personal reading log.

---

## 🚀 Features

- 📖 Add new books with title, author, rating, notes, cover image, and read date.
- 📝 Edit or delete books anytime.
- 🔍 Search by title or author.
- ✅ Responsive UI with clean, modern design.
- ⚡️ Instant delete with AJAX (no page reload).
- 🎯 Built with full-stack best practices.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, EJS
- **Client-side JS**: Vanilla JavaScript
- **Package Manager**: npm
- **Styling**: Custom CSS (fully responsive)

---

## 📦 Project Structure


---

## 🧪 Setup & Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/book-notes-app.git
   cd book-notes-app
npm install
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_url TEXT,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    notes TEXT,
    read_date DATE
);
## DATA BASE SETUP
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_PORT=5432
PORT=3000

##RUN THE APP
node server.js
VISIT :
http://localhost:3000
