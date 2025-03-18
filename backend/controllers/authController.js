const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.getMe = (req, res) => {
  res.json({ id: '123', name: 'John Doe' });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });
    console.log("User registration successful:", user); // Log successful registration

    res.status(201).json({
      success: true,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("Registration error:", error); // Log the error
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
