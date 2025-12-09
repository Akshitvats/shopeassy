import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking, heart rate monitor, and smartphone notifications.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable and stylish backpack with padded laptop compartment, multiple pockets, and water-resistant material.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    inStock: true
  },
  {
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life. Perfect for outdoor adventures.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys and premium switches for the ultimate typing experience.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for all-day use.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Perfect for laptops.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    category: 'Accessories',
    inStock: true
  },
  {
    name: 'Phone Case',
    description: 'Premium protective phone case with shock absorption and slim design. Available in multiple colors.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'Accessories',
    inStock: true
  },
  {
    name: 'Webcam HD',
    description: 'Full HD 1080p webcam with auto-focus and built-in microphone. Perfect for video calls and streaming.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Desk Organizer',
    description: 'Bamboo desk organizer with multiple compartments for pens, cables, and office supplies.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1587467512961-120760940315?w=500',
    category: 'Accessories',
    inStock: true
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch control, multiple brightness levels, and USB charging port.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home',
    inStock: true
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Accessories',
    inStock: false
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products removed');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
