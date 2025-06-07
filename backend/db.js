// backend/db.js
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://rajeshkharal21:kharal@cluster0.xnft3.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0';

async function connectToMongo() {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB Atlas');
}

async function getFoodData() {
  const foodItems = await mongoose.connection.db.collection("Food_collection").find({}).toArray();
  const categories = await mongoose.connection.db.collection("Categories").find({}).toArray();
  return [foodItems, categories];
}

module.exports = { connectToMongo, getFoodData };
