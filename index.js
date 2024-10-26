const connectToMongo = require('./db'); // Import the connectToMongo function
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// Call the connectToMongo function to establish a connection to MongoDB
connectToMongo();

// Define and mount your API routes
app.use('/api/auth', require('./api/auth'));
app.use('/api/notes', require('./routes/notes'));

// Export the app for serverless functions
module.exports = app;
