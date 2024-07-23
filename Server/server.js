// Import Statements
const express = require('express');
require('dotenv').config();
const { router } = require('./routes');
const { connected, isConnected } = require('./config/db');
const cors = require('cors');
const cloudinary = require('cloudinary').v2; // Import Cloudinary library

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Calling Functions
const port = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200,
};

// Use of middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(router); 
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  try {
    res.json({
      database: isConnected() ? 'connected' : 'disconnected',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Failed to check the status of Database');
  }
});

// Middleware to handle Cloudinary upload errors
app.use((err, req, res, next) => {
  if (err instanceof cloudinary.CloudinaryError) {
    // Handle Cloudinary errors specifically after review.
    console.error('Cloudinary Error :', err);
    res.status(500).send('Failed to upload file to Cloudinary');
  } else {
    next(err); 
  }
});

async function startServer() {
  try {
    await connected();
    app.listen(port, () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
