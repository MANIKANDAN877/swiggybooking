import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header: React.FC = () => {
  const { cart } = useCart();

  const cartItemCount = useMemo(() => cart.items.length, [cart.items.length]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🍔 Foodie</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/cart" className="btn btn-primary cart-btn">
            🛒 Cart
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
