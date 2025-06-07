const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Order = require('../models/Orders');

// 1. Import the Review model
const Review = require('../models/Review');

// 2. Review Submission Route
router.post('/review', async (req, res) => {
  try {
    const { name, email, address, message, rating } = req.body;
    if (!name || !email || !address || !message || !rating) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }
    await Review.create({ name, email, address, message, rating });
    res.json({ success: true, message: 'Thank you for your feedback!' });
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// JWT Secret Key
const jwtSecret = "HaHa";

// SIGNUP
router.post('/createuser', async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt);
    user = await User.create({ name, email, password: securePass, location });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Invalid credentials" });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// GET LOCATION (dummy)
router.post('/getlocation', async (req, res) => {
  res.json({ location: "Demo Address" });
});

// FOOD DATA (ensure you have getFoodData in db.js)
const { getFoodData } = require('../db');
router.post('/foodData', async (req, res) => {
  try {
    const [foodItems, categories] = await getFoodData();
    res.json([foodItems, categories]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// PLACE ORDER: Improved for display
router.post('/orderData', async (req, res) => {
  try {
    const { order_data, email, order_date } = req.body;
    let userOrder = await Order.findOne({ email });
    const newOrder = { Order_date: order_date, items: order_data };

    if (!userOrder) {
      await Order.create({
        email,
        order_data: [newOrder]
      });
    } else {
      userOrder.order_data.push(newOrder);
      await userOrder.save();
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// GET ALL ORDERS for this user
router.post('/myOrderData', async (req, res) => {
  try {
    const { email } = req.body;
    let eId = await Order.findOne({ email });
    res.json({ orderData: eId ? eId.order_data : [] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
