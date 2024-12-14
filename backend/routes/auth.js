const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup); // /api/auth/signup
router.post('/login', login); // /api/auth/login

module.exports = router;
