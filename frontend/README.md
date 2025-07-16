# Frontend Assets - Book Notes App

## Overview
This directory contains the frontend assets for the Book Notes application, including EJS templates, CSS styles, and client-side JavaScript. These files are served by the backend Express server.

## Directory Structure
```
frontend/
├── package.json           # Frontend configuration and metadata
├── public/                # Static assets served by Express
│   ├── styles.css        # Application styles and responsive design
│   └── script.js         # Client-side JavaScript for interactions
└── views/                # EJS templates rendered by the backend
    ├── layout.ejs        # Main layout template with common elements
    ├── index.ejs         # Home page displaying book collection
    ├── login.ejs         # User login form
    ├── register.ejs      # User registration form
    ├── add-book.ejs      # Add new book form
    └── edit-book.ejs     # Edit existing book form
```

## File Descriptions

### Public Assets
- **styles.css**: Contains all CSS styles including responsive design, form styling, and layout
- **script.js**: Handles client-side functionality like delete confirmations, form validation, and AJAX requests

### EJS Templates
- **layout.ejs**: Base template with navigation, header, and footer
- **index.ejs**: Displays user's book collection with search and management options
- **login.ejs**: User authentication form
- **register.ejs**: New user registration form
- **add-book.ejs**: Form for adding books with fields for title, author, rating, notes, etc.
- **edit-book.ejs**: Form for editing existing book details

## Usage
These frontend assets are automatically served by the backend Express server when you run the application. The backend is configured to:
- Serve static files from `frontend/public/` at the root URL
- Render EJS templates from `frontend/views/` directory

## Dependencies
The frontend uses:
- **EJS**: Template engine for rendering dynamic HTML
- **CSS**: Modern styling with flexbox and grid layouts
- **Vanilla JavaScript**: No external libraries, pure JavaScript for interactions

## Notes
- No separate build process required - files are served directly by Express
- Templates are server-side rendered with user data
- Static assets are cached by Express for performance
- Responsive design works on desktop and mobile devices
1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd book-notes-app
   ```

2. **Install Dependencies**
   Navigate to the `frontend` directory and install any necessary dependencies (if applicable):
   ```
   cd frontend
   npm install
   ```

3. **Run the Application**
   The frontend is served through the backend. Ensure the backend server is running:
   ```
   cd backend
   npm start
   ```

4. **Access the Application**
   Open your web browser and go to `http://localhost:3000` to access the application.

## Usage
- **Register**: Create a new account to start managing your book notes.
- **Login**: Access your account to view and manage your books.
- **Add Book**: Use the form to add new books to your collection.
- **Edit Book**: Modify details of existing books.
- **Delete Book**: Remove books from your collection.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.