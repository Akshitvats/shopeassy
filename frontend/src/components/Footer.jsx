import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-brand">ShopEassy</h3>
            <p className="footer-description">
              Your one-stop shop for quality products at amazing prices. 
              Shop with confidence and enjoy fast delivery.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/login">My Account</Link></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Wishlist</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns & Refunds</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-list contact-list">
              <li>
                <Mail size={16} />
                <span>support@shopeassy.com</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>123 Commerce St, City, State 12345</span>
              </li>
            </ul>
            <div className="newsletter">
              <h5>Subscribe to Newsletter</h5>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} ShopEassy. All rights reserved.</p>
          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icons">
              <span className="payment-badge">VISA</span>
              <span className="payment-badge">Mastercard</span>
              <span className="payment-badge">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
