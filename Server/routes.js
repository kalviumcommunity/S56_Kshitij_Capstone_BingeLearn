// Import necessary modules
const express = require('express');
const router = express.Router();
const { UserModal, TeacherModal } = require('./models/BD'); // Assuming you have UserModal and TeacherModal defined in your models/BD file
const bcrypt = require('bcryptjs');

// Route for user sign Up
router.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hashing the password when signing Up
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModal({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route for teacher sign Up
router.post("/createTeacher", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingTeacher = await TeacherModal.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hashing the password when Signing Up
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = new TeacherModal({ name, email, password: hashedPassword });
    await newTeacher.save();
    res.status(201).json({ message: "Teacher created successfully", teacher: { name: newTeacher.name, email: newTeacher.email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route for user login
router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Comparing hashed password with the password provided by the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Route for teacher login
router.post("/loginTeacher", async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await TeacherModal.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Comparing hashed password with the password provided by teacher.
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: "Login successful", teacher: { name: teacher.name, email: teacher.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
