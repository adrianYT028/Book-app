
# 📚 Book Notes App

A **professional, secure web application** to track books you've read, take notes, give ratings, and manage your personal reading library with **user authentication** and a **beautiful, modern interface**.

---

## ✨ Features

### 📖 Core Functionality
- **Add new books** with title, author, rating, notes, cover image, and read date
- **Edit or delete books** anytime with instant updates
- **Search functionality** by title or author
- **Star ratings** (1-5 stars) for each book
- **Personal notes** for each book you've read

### 🔐 Security & Authentication
- **User registration** and **secure login**
- **Session management** with express-session
- **Password protection** for personal book collections
- **User-specific book libraries** (each user sees only their books)

### 🎨 Professional Design
- **Modern, clean interface** with premium styling
- **Fully responsive design** - works on desktop, tablet, and mobile
- **Smooth animations** and hover effects
- **Professional color scheme** and typography
- **Intuitive user experience** with clear navigation

### ⚡️ Technical Features
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
