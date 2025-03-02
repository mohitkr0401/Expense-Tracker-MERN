// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  changePassword,
  getUserByUsername
} = require('../controllers/userController');

// Protected Routes (require JWT)
router.route('/me')
  .get(protect, getProfile)          // Get current user's profile
  .put(protect, updateProfile);      // Update profile

router.put('/password', protect, changePassword); // Change password

// Public Route (no authentication needed)
router.get('/:username', getUserByUsername); // Get user by username

module.exports = router;