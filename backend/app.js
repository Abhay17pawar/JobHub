// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS
const uploadRoutes = require('./routes/file');
const app = express();

// Load environment variables
dotenv.config();

// Use CORS middleware
app.use(cors()); // Allow all domains by default, or customize as needed

app.use(express.json());

// Import routes
const dashboardRoutes = require('./routes/dashboardRoute');

// Use the dashboard routes for /api path
app.use('/api', dashboardRoutes);
app.use('/api', uploadRoutes);

// Set the port from the environment or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


