# Ecommerce Backend

A simple Node.js + Express REST API for an ecommerce application.

## Features

- User authentication with JWT and bcrypt
- MongoDB database with Mongoose ODM
- CRUD operations for products, users, and orders
- Protected routes with authentication middleware
- Clean and beginner-friendly code structure

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- cors
- dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally, or MongoDB Atlas account

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (or copy from `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Make sure MongoDB is running on your system

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/me` - Get user profile (protected)
- `PUT /api/users/me` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my` - Get user's orders (protected)

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── productController.js
│   ├── orderController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   └── Order.js           # Order schema
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── userRoutes.js
├── .env                   # Environment variables
├── .env.example
├── package.json
└── server.js              # Main entry point
```

## Seeding Sample Data (Optional)

You can manually add products using the POST `/api/products` endpoint or use MongoDB Compass/Shell to insert sample data.

Example product:
```json
{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 99.99,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "category": "Electronics",
  "inStock": true
}
```
