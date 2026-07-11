const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  register,
  registerAdmin,
  login,
  getMe,
  updateProfile,
  changePassword
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/admin/register', registerAdmin);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;