const User = require('../models/User');

// @desc    Make a user admin (TEMPORARY - Remove in production)
// @route   POST /api/admin-setup/make-admin
// @access  Public (ONLY FOR DEVELOPMENT)
exports.makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    // Update role to admin
    user.role = 'admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} is now an admin!`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
};

// @desc    List all users with their roles
// @route   GET /api/admin-setup/users
// @access  Public (ONLY FOR DEVELOPMENT)
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email role createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};