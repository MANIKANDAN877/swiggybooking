import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();

  const deliveryFee = 40;
  const subtotal = cart.total;
  const total = subtotal + deliveryFee;

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some delicious food to get started!</p>
        <Link to="/" className="btn btn-primary">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Cart</h1>
          {cart.restaurantName && (
            <p className="restaurant-name">From: {cart.restaurantName}</p>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  {item.isVegetarian && <span className="veg-badge">🟢 Veg</span>}
                  <p className="item-price">₹{item.price}</p>
                </div>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <h3>Order Summary</h3>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
            
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            
            <div className="summary-item">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            
            <div className="summary-item total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            
            <div className="checkout-actions">
              <Link to="/checkout" className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
              <Link to="/" className="btn btn-outline">
                Add More Items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
