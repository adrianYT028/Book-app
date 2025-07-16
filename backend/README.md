
# Backend - Book Notes App

## Overview
The backend for the Book Notes application is built with Node.js and Express.js, providing RESTful APIs, user authentication, and PostgreSQL database integration.

## Directory Structure
```
backend/
├── .env                    # Environment variables (not in git)
├── server.js              # Main Express application
├── db.js                  # PostgreSQL connection configuration
├── package.json           # Dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── controllers/
│   └── booksController.js # Business logic for book operations
└── routes/
    └── books.js           # API routes for book endpoints
```

## Core Features

### Authentication & Security
- User registration and login with bcrypt password hashing
- Session-based authentication using express-session
- PostgreSQL session store for persistence
- User-specific data isolation (users only see their own books)
- Input validation and SQL injection protection

### API Endpoints
- **GET /** - Home page with user's books
- **GET /login** - Login form
- **POST /login** - Authenticate user
- **GET /register** - Registration form  
- **POST /register** - Create new user account
- **GET /logout** - Destroy session and logout
- **GET /add-book** - Add book form
- **POST /books** - Create new book
- **GET /edit-book/:id** - Edit book form
- **POST /edit-book/:id** - Update existing book
- **DELETE /books/:id** - Delete book (AJAX)
- **GET /search** - Search books by title/author

### Database Integration
- PostgreSQL database with connection pooling
- Environment-based configuration
- Prepared statements for security
- Error handling and connection management

## Dependencies

### Core Dependencies
```json
{
  "express": "^4.17.1",          // Web framework
  "pg": "^8.7.1",                // PostgreSQL client
  "bcryptjs": "^2.4.3",          // Password hashing
  "express-session": "^1.17.1",  // Session management
  "connect-pg-simple": "^6.1.0", // PostgreSQL session store
  "dotenv": "^10.0.0"            // Environment variables
}
```

### Development Dependencies
```json
{
  "nodemon": "^2.0.7"            // Auto-restart during development
}
```

## Environment Configuration
Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=book_notes_db
DB_PASS=your_password
DB_PORT=5432

# Session Configuration
SESSION_SECRET=your-secret-key-change-this-in-production
PORT=3000
```

## Database Schema
The application expects these PostgreSQL tables:
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover_url TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    read_date DATE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session table (created automatically by connect-pg-simple)
CREATE TABLE user_sessions (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);
```

## Scripts
```bash
# Start production server
npm start

# Start development server with auto-restart
npm run dev

# Install dependencies
npm install
```

## Architecture

### MVC Pattern
- **Models**: Database queries and data logic (in routes/controllers)
- **Views**: EJS templates (served from ../frontend/views)
- **Controllers**: Request handling and business logic

### Security Features
- Password hashing with bcrypt (10 rounds)
- SQL injection prevention with parameterized queries
- Session-based authentication with secure cookies
- User data isolation and authorization checks
- Environment variable protection for sensitive data

### Error Handling
- Comprehensive try-catch blocks
- Database connection error handling
- User-friendly error messages
- Server error logging for debugging

## Development Setup
1. **Install dependencies**: `npm install`
2. **Configure database**: Update `.env` with your PostgreSQL credentials
3. **Create database**: Create the PostgreSQL database and tables
4. **Start development server**: `npm run dev`
5. **Test application**: Visit `http://localhost:3000`

## Production Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)
4. Enable HTTPS for security
5. Set up database backups
6. Monitor logs and performance
- **AJAX-powered deletions** (no page reload)
- **Real-time UI updates**
- **Form validation** and error handling
- **Toast notifications** for user feedback
- **RESTful API** structure

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Express-session, bcrypt
- **Frontend**: HTML5, CSS3, EJS templating
- **Client-side**: Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Package Manager**: npm

---

## 📦 Project Structure

```
book-notes-app/
├── public/
│   ├── css/
│   │   └── styles.css          # Professional styling & responsive design
│   └── script.js               # Client-side functionality
├── routes/
│   ├── auth.js                 # Authentication routes
│   └── books.js                # Book CRUD operations
├── views/
│   ├── auth/
│   │   ├── login.ejs           # Login page
│   │   └── register.ejs        # Registration page
│   ├── books/
│   │   ├── add-book.ejs        # Add new book form
│   │   ├── edit-book.ejs       # Edit book form
│   │   └── index.ejs           # Main dashboard
│   └── layout.ejs              # Base template
├── middleware/
│   └── auth.js                 # Authentication middleware
├── db.js                       # Database connection
├── server.js                   # Main application server
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/book-notes-app.git
cd book-notes-app
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Database Setup**

Create a PostgreSQL database and run these SQL commands:

```sql
-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table with user relationship
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_url TEXT,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    notes TEXT,
    read_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_books_user_id ON books(user_id);
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
```

### 4. **Environment Configuration**

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_USER=your_database_username
DB_HOST=localhost
DB_NAME=book_notes_db
DB_PASS=your_database_password
DB_PORT=5432

# Server Configuration
PORT=3000

# Session Secret (use a strong, random string)
SESSION_SECRET=your_super_secret_session_key_here

# Environment
NODE_ENV=development
```

### 5. **Run the Application**
```bash
npm start
```

Visit: **http://localhost:3000**

---

## 🔐 Authentication Flow

1. **Registration**: New users create an account with username, email, and password
2. **Login**: Existing users log in with username/email and password
3. **Session Management**: Users stay logged in until they log out or session expires
4. **Protected Routes**: Book operations require authentication
5. **User Isolation**: Each user only sees their own books

---

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Desktop** (1200px+): Full layout with sidebar navigation
- **Tablet** (768px-1199px): Adapted layout with collapsible elements
- **Mobile** (320px-767px): Stack layout with touch-friendly buttons

---

## 🎨 Design Features

- **Modern Card-based Layout** for book display
- **Gradient Backgrounds** and subtle shadows
- **Smooth Hover Effects** on interactive elements
- **Professional Typography** with carefully chosen fonts
- **Consistent Color Scheme** throughout the application
- **Accessibility Features** with proper contrast and focus states

---

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Books (Protected Routes)
- `GET /` - View all user's books
- `GET /search` - Search books
- `GET /add-book` - Add book form
- `POST /books` - Create new book
- `GET /edit-book/:id` - Edit book form
- `POST /edit-book/:id` - Update book
- `DELETE /books/:id` - Delete book

---

## 🚀 Deployment on Replit

This app is optimized for deployment on **Replit**:

1. **Import from GitHub** to your Replit workspace
2. **Configure environment variables** in Replit Secrets
3. **Set up PostgreSQL** using Replit Database
4. **Click Run** to start your application
5. **Deploy** using Replit's deployment features

### Replit Configuration
- Node.js environment automatically detected
- Port 3000 configured for web access
- Environment variables managed through Replit Secrets
- Automatic package installation on run

---

## 🔧 Development

### Adding New Features
1. Follow the existing project structure
2. Add routes in appropriate files (`routes/` directory)
3. Create corresponding EJS templates (`views/` directory)
4. Update CSS for styling (`public/css/styles.css`)
5. Add client-side functionality (`public/script.js`)

### Database Migrations
For schema changes, create migration files and update the database accordingly.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with modern web development best practices
- Responsive design inspired by contemporary UI/UX patterns
- Security implementations following industry standards

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the Issues section of this repository
2. Create a new issue with detailed information
3. For urgent matters, contact the maintainers

---

**🌟 If you find this project helpful, please give it a star!**
