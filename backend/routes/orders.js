const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurant, items, deliveryAddress, paymentMethod } = req.body;
    
    // Calculate total amount
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const finalAmount = subtotal + deliveryFee;
    
    // Calculate estimated delivery time
    const orderTime = new Date();
    const estimatedDelivery = new Date(orderTime.getTime() + 45 * 60000); // 45 minutes from now
    const estimatedTime = `${estimatedDelivery.getHours()}:${estimatedDelivery.getMinutes().toString().padStart(2, '0')}`;
    
    const order = new Order({
      user: req.user,
      restaurant,
      items,
      totalAmount: subtotal,
      deliveryFee,
      finalAmount,
      deliveryAddress,
      paymentMethod,
      estimatedDeliveryTime: estimatedTime
    });
    
    const savedOrder = await order.save();
    await savedOrder.populate('restaurant', 'name');
    
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .populate('restaurant', 'name imageUrl')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name imageUrl address')
      .populate('user', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (order.user._id.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
