# Simple Full-Stack Ecommerce Website

A complete, beginner-friendly full-stack ecommerce application with a Node.js/Express backend and React frontend.

## Project Overview

This is a simple ecommerce website that demonstrates core functionality including user authentication, product browsing, shopping cart, and order management. The project is designed to be clean, easy to understand, and perfect for learning full-stack development.

## Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ CRUD operations for Users, Products, and Orders
- ✅ Protected routes with authentication middleware
- ✅ Clean, modular code structure

### Frontend
- ✅ React 18 with Vite
- ✅ React Router DOM for navigation
- ✅ Context API for state management
- ✅ Shopping cart functionality
- ✅ User authentication flow
- ✅ Order management
- ✅ Responsive design with plain CSS
- ✅ Lucide React icons

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- cors
- dotenv

**Frontend:**
- React 18
- Vite
- React Router DOM v6
- Lucide React
- Plain CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

## Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProductCard.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Orders.jsx
    │   │   └── Profile.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Installation & Setup

### 1. Clone or Download the Project

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
# Add the following:
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
PORT=5000

# Start MongoDB (if running locally)
# Make sure MongoDB is running on your system

# Start the backend server
npm start

# Or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### 1. First Time Setup

1. Make sure both backend and frontend servers are running
2. Open your browser and go to `http://localhost:3000`
3. Register a new account
4. You'll need to add some products first (see below)

### 2. Adding Sample Products

You can add products either through:

**Option A: API directly (using Postman, curl, or similar)**
```bash
POST http://localhost:5000/api/products
Headers: 
  Content-Type: application/json
  Authorization: Bearer YOUR_JWT_TOKEN

Body:
{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 99.99,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "category": "Electronics",
  "inStock": true
}
```

**Option B: MongoDB Compass or MongoDB Shell**

Connect to your MongoDB instance and insert products directly into the `products` collection.

### 3. Using the Application

1. **Browse Products** - View all products on the home page
2. **View Product Details** - Click on any product to see details
3. **Add to Cart** - Add products to your cart with desired quantity
4. **Manage Cart** - View cart, update quantities, remove items
5. **Checkout** - Place an order (requires login)
6. **View Orders** - Check your order history
7. **Update Profile** - Edit your name, email, or password

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my` - Get user orders (protected)

## Sample Product Data

Here are some sample products you can add:

```json
[
  {
    "name": "Wireless Headphones",
    "description": "Premium wireless headphones with active noise cancellation and 30-hour battery life",
    "price": 199.99,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "category": "Electronics",
    "inStock": true
  },
  {
    "name": "Smart Watch",
    "description": "Feature-rich smartwatch with health tracking and notifications",
    "price": 299.99,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "category": "Electronics",
    "inStock": true
  },
  {
    "name": "Laptop Backpack",
    "description": "Durable backpack with padded laptop compartment",
    "price": 49.99,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    "category": "Accessories",
    "inStock": true
  },
  {
    "name": "Portable Speaker",
    "description": "Waterproof Bluetooth speaker with amazing sound quality",
    "price": 79.99,
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    "category": "Electronics",
    "inStock": true
  }
]
```

## Important Notes

- This is a learning project - **NOT production-ready**
- No payment integration (Stripe, PayPal, etc.)
- No file upload functionality (uses image URLs)
- No role-based access control
- JWT stored in localStorage (not the most secure for production)
- No refresh token implementation
- No email verification
- Basic error handling

## Future Enhancements

If you want to extend this project, consider adding:
- Payment gateway integration (Stripe/PayPal)
- Image upload functionality (Cloudinary/AWS S3)
- Product search and filtering
- Product reviews and ratings
- Admin dashboard
- Order status updates
- Email notifications
- Password reset functionality
- Pagination for products and orders
- Product inventory management
- Wishlist feature

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check your MONGODB_URI in .env file
- If using MongoDB Atlas, ensure your IP is whitelisted

**CORS Errors:**
- Ensure backend is running on port 5000
- Check that proxy is configured correctly in vite.config.js

**Authentication Issues:**
- Clear localStorage in browser
- Check JWT_SECRET is set in backend .env
- Verify token is being sent in Authorization header

**Port Already in Use:**
- Change PORT in backend .env
- Change port in frontend vite.config.js

## License

This project is open source and available for learning purposes.

## Contributing

Feel free to fork, modify, and use this project for learning!
