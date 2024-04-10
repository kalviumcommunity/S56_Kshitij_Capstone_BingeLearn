const express = require('express');
const router = express.Router();
const { UserModal } = require('./models/BD'); // Import your User model

// Route to create a new user
router.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body; // Destructure name, email, and password from request body

    // Check if the email already exists in the database
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new UserModal({ name, email, password });

    // Save the new user to the database
    await newUser.save();

    // Send the saved user as response
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
