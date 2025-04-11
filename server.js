// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Connect to MongoDB using the connection logic in config/db.js
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Mount application routes under /api/applications
app.use('/api/applications', applicationRoutes);

// Global error handling middleware for graceful error responses
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start the server on the specified PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
