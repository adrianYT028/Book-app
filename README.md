# Book Notes App

## Overview
The Book Notes App is a web application that allows users to manage their book collection, including adding, editing, and deleting books. Users can also register and log in to their accounts to keep their book lists private.

## Project Structure
```
book-notes-app/
├── README.md
├── backend/
│   ├── .env                    # Environment variables
│   ├── server.js              # Main server file
│   ├── db.js                  # Database connection
│   ├── package.json           # Backend dependencies
│   ├── controllers/
│   │   └── booksController.js # Book operations logic
│   └── routes/
│       └── books.js           # API routes for books
└── frontend/
    ├── package.json           # Frontend configuration
    ├── public/
    │   ├── styles.css         # CSS styles
    │   └── script.js          # Client-side JavaScript
    └── views/
        ├── layout.ejs         # Main layout template
        ├── index.ejs          # Home page
        ├── login.ejs          # Login page
        ├── register.ejs       # Registration page
        ├── add-book.ejs       # Add book form
        └── edit-book.ejs      # Edit book form
```

### Backend
The backend is built using Node.js and Express. It handles all server-side logic, database interactions, and user authentication.

- **server.js**: Main entry point for the backend application.
- **db.js**: Database connection logic for PostgreSQL.
- **package.json**: Configuration file for the backend, listing dependencies and scripts.
- **.env**: Environment variables for database credentials and session secrets.
- **routes/books.js**: Defines API routes for book-related operations.
- **controllers/booksController.js**: Contains business logic for handling book operations.

### Frontend
The frontend uses EJS templates served by the backend and provides the user interface.

- **public/styles.css**: CSS styles for the frontend application.
- **public/script.js**: JavaScript code for client-side interactions.
- **views/**: EJS templates for different pages (served by backend from frontend/views).

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm package manager

### Installation
1. **Clone or download the project**
2. **Set up the database:**
   - Create a PostgreSQL database named `book_notes_db`
   - Update the `.env` file in the backend directory with your database credentials

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Start the application:**
   ```bash
   cd backend
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

5. **Access the application:**
   Open your browser and go to `https://book-app-qbqy.onrender.com`

## Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=book_notes_db
DB_PASS=your_postgres_password
DB_PORT=5432
SESSION_SECRET=your-secret-key-change-this
```

## Features
- User registration and authentication
- Add, edit, and delete books
- Search functionality
- Book rating and notes
- Responsive design

## Usage
1. **Register**: Create a new account to start managing your book collection
2. **Login**: Access your personal book collection
3. **Add Books**: Include title, author, cover URL, rating, and personal notes
4. **Search**: Find books in your collection by title or author
5. **Edit/Delete**: Modify or remove books from your collection
- Log in to view, add, edit, or delete books.
- Use the search functionality to find specific books in your collection.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
