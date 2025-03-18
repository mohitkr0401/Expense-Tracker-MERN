const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

const { getMe } = require('../controllers/authController');
router.post('/register', register);
router.post('/login', login);


router.get('/me', /* authMiddleware, */ getMe);
module.exports = router;