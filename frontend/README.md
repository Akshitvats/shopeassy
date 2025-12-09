# Ecommerce Frontend

A simple React-based ecommerce frontend application built with Vite.

## Features

- Product browsing and search
- User authentication (login/register)
- Shopping cart functionality
- Order management
- User profile management
- Clean and responsive design
- React Context for state management

## Tech Stack

- React 18
- Vite
- React Router DOM v6
- Lucide React (icons)
- Plain CSS (no Tailwind or CSS-in-JS)

## Prerequisites

- Node.js (v14 or higher)
- Backend API running on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure the backend server is running on port 5000

4. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation component
│   │   ├── Navbar.css
│   │   ├── ProductCard.jsx    # Product card component
│   │   └── ProductCard.css
│   ├── context/
│   │   ├── AuthContext.jsx    # Auth state management
│   │   └── CartContext.jsx    # Cart state management
│   ├── pages/
│   │   ├── Home.jsx           # Home page (product list)
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Register page
│   │   ├── ProductDetail.jsx  # Single product page
│   │   ├── Cart.jsx           # Cart page
│   │   ├── Orders.jsx         # Orders page
│   │   ├── Profile.jsx        # User profile page
│   │   └── [corresponding CSS files]
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## Features Overview

### Pages
- **Home (/)** - Browse all products
- **Product Detail (/products/:id)** - View single product and add to cart
- **Cart (/cart)** - View cart items, update quantities, checkout
- **Orders (/orders)** - View order history
- **Profile (/profile)** - Update user information
- **Login (/login)** - User login
- **Register (/register)** - User registration

### State Management
- **AuthContext** - Manages user authentication state and JWT token
- **CartContext** - Manages shopping cart state (stored in localStorage)

### Features
- Add products to cart
- Update product quantities
- Remove items from cart
- Place orders
- View order history
- Update profile information
- Persistent cart (localStorage)
- Persistent authentication (localStorage)

## API Integration

The frontend communicates with the backend API through fetch requests. The proxy is configured in `vite.config.js` to forward `/api` requests to `http://localhost:5000`.

## Styling

All styling is done with plain CSS files. The design is clean, minimal, and responsive with:
- Mobile-friendly layouts
- Simple color scheme
- Clean typography
- Smooth transitions
- No external CSS frameworks
