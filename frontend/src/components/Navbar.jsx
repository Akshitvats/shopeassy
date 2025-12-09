import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Home, Shield } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Home size={24} />
          <span>ShopEassy</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {!isAdmin && (
            <Link to="/cart" className="nav-link cart-link">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </Link>
          )}

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="nav-link">
                  <Shield size={20} />
                  Admin
                </Link>
              )}
              {!isAdmin && (
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              )}
              <Link to="/profile" className="nav-link">
                <User size={20} />
                {user.name}
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
