const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); // Added missing import

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, using demo mode');
      // Demo mode - simulate successful registration
      return res.status(201).json({ 
        message: 'User registered successfully (Demo Mode)',
        user: { name, email }
      });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with default profile data
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword,
      // Default profile data
      title: 'Aspiring Software Developer',
      location: 'Mumbai, India',
      education: '12th Grade - Science Stream (PCM)',
      experience: 'Fresher - Looking for opportunities',
      skills: 'JavaScript, Python, HTML/CSS, React Basics, Problem Solving',
      interests: 'Web Development, Mobile Apps, AI/ML, Gaming, Open Source',
      bio: 'Passionate about technology and eager to start my career in software development. Currently learning modern web technologies and building projects to strengthen my skills.',
      achievements: 'School Topper in Mathematics, Built 3 personal projects, Completed online coding bootcamp',
      goals: 'Get internship at tech company, Master full-stack development, Contribute to open source projects',
      privacy: true // Default to public profile
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get user profile by ID or email
exports.getUserProfile = async (req, res) => {
  try {
    const { id, email } = req.query;
    let user;
    if (id) {
      user = await User.findById(id).select('-password');
    } else if (email) {
      user = await User.findOne({ email }).select('-password');
    } else {
      return res.status(400).json({ message: 'User ID or email required' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    // In production, get user ID from authentication (e.g., req.user.id)
    // Here, use email from req.body for demo
    const { email, ...rest } = req.body;
    console.log('Update profile request:', email, rest); // Debug log
    const user = await User.findOneAndUpdate(
      { email },
      { $set: rest },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to change password', error: err.message });
  }
}; 