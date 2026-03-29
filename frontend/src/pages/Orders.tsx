import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  isVegetarian: boolean;
}

interface Order {
  _id: string;
  restaurant: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  finalAmount: number;
  status: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  estimatedDeliveryTime: string;
  orderDate: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      case 'out_for_delivery':
        return '#007bff';
      case 'preparing':
      case 'ready':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return <div className="loading">Loading your orders...</div>;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div className="orders-container">
        <div className="login-prompt">
          <h2>Please Login to View Orders</h2>
          <p>You need to be logged in to view your order history.</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start ordering from your favorite restaurants!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="restaurant-info">
                <img 
                  src={order.restaurant.imageUrl} 
                  alt={order.restaurant.name}
                  className="restaurant-image"
                />
                <div>
                  <h3>{order.restaurant.name}</h3>
                  <p className="order-date">
                    {new Date(order.orderDate).toLocaleDateString()} • {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="order-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">
                    {item.name} {item.isVegetarian && '🟢'}
                  </span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="order-footer">
              <div className="order-details">
                <div className="detail-row">
                  <span>Subtotal:</span>
                  <span>₹{order.totalAmount}</span>
                </div>
                <div className="detail-row">
                  <span>Delivery Fee:</span>
                  <span>₹{order.deliveryFee}</span>
                </div>
                <div className="detail-row total">
                  <span>Total:</span>
                  <span>₹{order.finalAmount}</span>
                </div>
              </div>
              
              <div className="order-meta">
                <p><strong>Delivery Address:</strong></p>
                <p>{order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                <p>{order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                <p><strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</p>
                {order.estimatedDeliveryTime && (
                  <p><strong>Est. Delivery:</strong> {order.estimatedDeliveryTime}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
