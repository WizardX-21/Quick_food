const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', ReviewSchema);
