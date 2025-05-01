# GitHub Documentation for NoSQL Book Recommendation System

## Project Overview

This project is a book recommendation system built with a modern tech stack including React, Node.js, Express, and MongoDB. It features user authentication, book catalog management, personalized recommendations, and administrative controls.

## Features

### User System
- Registration and login functionality
- User profiles with viewing history and favorites
- Role-based access control (user/admin)
- JWT authentication

### Book Management
- Comprehensive book catalog with details
- Genre-based categorization
- Book rating and review system
- Search functionality (title, author, genre)

### Recommendation Engine
- Collaborative filtering recommendations
- Personalized suggestions based on user history
- Popular books display

### Admin Features
- User management (role changes, deletion)
- Book management (add/edit/delete)
- System oversight

## Technology Stack

### Frontend
- **React**: Component-based UI
- **React Bootstrap**: UI components and styling
- **Axios**: HTTP requests to backend

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **Mongoose**: MongoDB object modeling

### Database
- **MongoDB**: NoSQL database
- Document-based storage for users and books

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (v4+)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8080
   ```

4. Start the development servers:
   ```bash
   # In backend directory
   npm start
   
   # In frontend directory
   npm start
   ```

## API Documentation

### User Routes
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/:userId/history` - Get user history
- `POST /api/users/:userId/history/:bookId` - Add to history
- `GET /api/users/:userId/recommendations` - Get recommendations

### Book Routes
- `GET /api/books` - Get all books
- `GET /api/books/search` - Search books
- `GET /api/books/genre/:genre` - Get books by genre
- `POST /api/books/:id/reviews` - Add review

### Admin Routes
- `PUT /api/users/:id` - Update user role
- `DELETE /api/users/:id` - Delete user
- `POST /api/books` - Add new book
- `DELETE /api/books/:id` - Delete book

## Database Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String, // 'user' or 'admin'
  favorites: [ObjectId], // References to Book
  history: [ObjectId] // References to Book
}
```

### Book Model
```javascript
{
  title: String,
  author: String,
  genre: String,
  description: String,
  publishedYear: Number,
  rating: Number,
  coverUrl: String,
  reviews: [{
    user: ObjectId, // Reference to User
    rating: Number,
    comment: String,
    createdAt: Date
  }]
}
```

## Contribution Guidelines

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes with descriptive messages
4. Push to your branch
5. Submit a pull request

## License

This project is licensed under the MIT License.

## References

- React Documentation: https://react.dev
- Node.js Documentation: https://nodejs.org
- MongoDB Documentation: https://www.mongodb.com/docs/
- Express Documentation: https://expressjs.com
