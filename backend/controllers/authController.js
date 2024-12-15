const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {JWT_SECRET} = require('../middleware/auth');

const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({error: 'Please provide an email and password'});
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }

        const user = await User.create(email, password);
        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET);
        res.status(201).json({user, token});
    } catch (error) {
        console.error('Error during signup:', error);
        if (error instanceof Error) {
            // Check if error is an instance of Error and log the detailed message
            res.status(500).json({ error: error.message || 'Internal server error' });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: 'Please provide an email and password'});
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({error: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid email or password'});
        }

        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET);
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
    signup,
    login
};
