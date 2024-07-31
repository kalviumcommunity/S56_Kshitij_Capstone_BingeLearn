// Import necessary modules
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { UserModal, TeachersModal } = require('./models/BD'); 
const bcrypt = require('bcryptjs');
const cloudinary = require('./utils/cloudinary');
const upload = require("./multer");
const jwt = require('jsonwebtoken');

// Secret key for signing JWT from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

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
    const existingTeacher = await TeachersModal.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hashing the password when Signing Up
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = new TeachersModal({ name, email, password: hashedPassword });
    await newTeacher.save();
    res.status(201).json({ message: "Teacher created successfully", teacher: { name: newTeacher.name, email: newTeacher.email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

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

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set JWT and email as HttpOnly cookies
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('email', user.email, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

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
    const teacher = await TeachersModal.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Comparing hashed password with the password provided by the teacher
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ teacherId: teacher._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set JWT and email as HttpOnly cookies
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('email', teacher.email, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ message: "Login successful", teacher: { name: teacher.name, email: teacher.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.post('/savecourse', async (req, res) => {
  const { email, courseName } = req.body;

  try {
    const teacher = await TeachersModal.findOne({ email: email });
    console.log(teacher)

    if (teacher) {
      teacher.courseName = courseName;
      await teacher.save();
      res.status(200).json({ message: 'Course name saved successfully!' });
    } else {
      res.status(404).json({ message: 'Teacher not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(err)
  }
});

router.post('/savevideo', async (req, res) => {
  const { email, courseName, video } = req.body;

  try {
    const teacher = await TeachersModal.findOne({ email: email });

    if (teacher) {
      const course = teacher.courses.find(course => course.courseName === courseName);

      if (course) {
        const duplicateVideo = course.videos.find(v => v.name === video.name);
        if (duplicateVideo) {
          return res.status(400).json({ message: 'Video with the same name already exists!' });
        }
        course.videos.push(video);
      } else {
        // Create new course if it doesn't exist
        teacher.courses.push({ courseName, videos: [video] });
      }

      await teacher.save();
      res.status(200).json({ message: 'Video details saved successfully!' });
    } else {
      res.status(404).json({ message: 'Teacher not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
});

// Getting video details
router.get('/videos', async (req, res) => {
  const { email, courseName } = req.query;
  try {

    // Find the teacher by email
    const teacher = await TeachersModal.findOne({ email: email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    console.log('Teacher found:', teacher);
    const course = teacher.courses.find(course => course.courseName === courseName);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Extract video names
    const videoNames = course.videos.map(video => video.name);

    // Send the video names in the response
    res.json(videoNames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
});



// Upload Route
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
      console.log(req.file);  
      const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image"
      });

      res.status(200).json({
          message: 'Image uploaded successfully',
          imageUrl: result.secure_url
      });
  } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({
          message: 'Error uploading image',
          error: error.message
      });
  }
});



// Route to get user name by email
router.get('/getUserName', async (req, res) => {
  const { email } = req.query;
  try {
    // Find the user by email
    const user = await UserModal.findOne({email: email});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's name in the response
    res.json({ name: user.name });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'Error fetching user name', error });
  }
});


// Route to get all the courses along with their Course makers
router.get('/getAllCourses', async (req, res) => {
  try {
    const teachers = await TeachersModal.find({}, 'name courses');
    const courses = teachers.flatMap(teacher =>
      teacher.courses.map(course => ({
        courseName: course.courseName,
        teacherName: teacher.name,
      }))
    );
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});
module.exports = { router };
