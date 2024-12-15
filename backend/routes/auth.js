const express = require('express');
const router = express.Router();

const { signup, login, userExists } = require('../controllers/authController');

router.post('/signup', signup); // /api/auth/signup
router.post('/login', login); // /api/auth/login
router.get('/check', userExists); // /api/auth/check

module.exports = router;
