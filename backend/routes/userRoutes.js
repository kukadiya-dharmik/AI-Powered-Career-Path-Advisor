const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateProfile, changePassword } = require('../controllers/userController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put('/profile', updateProfile);

// Change user password
router.post('/change-password', changePassword);

module.exports = router; 