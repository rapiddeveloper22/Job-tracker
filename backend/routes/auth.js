const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// JWT Secret Key (Use dotenv for secure storage)
const JWT_SECRET = process.env.JWT_SECRET || '1q_5G%%,5p?>~_q"[sAEWsXA^{$Yju2v5TG>fyFeuD^#[8V!fCBdIf@dgd:q]ni';

// User Sign-Up
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
        console.log(token);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        console.log(token);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to log in user' });
    }
});

module.exports = router;
