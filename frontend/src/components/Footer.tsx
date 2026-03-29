import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Foodie</h3>
            <p>Your favorite food ordering platform</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Restaurant Browsing</li>
              <li>Fast Delivery</li>
              <li>Secure Payments</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@foodie.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Foodie. Developed by Manikandan K S. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
