const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const { connectToMongo } = require('./db');

// Enable CORS for frontend requests
app.use(cors({
  origin: [
    'http://localhost:3000',                                 // Local dev
    'https://quick-food-git-main-rrajesh-kharals-projects.vercel.app', // Vercel production (adjust to your domain!)
    'https://quick-food-eight.vercel.app'                    // Your other Vercel domain (if exists)
  ],
  credentials: true
}));


// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB before starting the server
connectToMongo().then(() => {
  // Register routes
  app.use('/api/auth', require('./Routes/Auth'));

  // (REMOVE this line ↓↓↓)
  // app.use('/api/contact', require('./Routes/Contact'));

  // Start server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});
