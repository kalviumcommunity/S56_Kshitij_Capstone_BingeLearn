require('dotenv').config();
const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = router;