const express = require('express');
const Application = require('../models/Application');
const router = express.Router();

// Get all applications for a user
router.post('/getAll', async (req, res) => {
    const { user_email } = req.body;
    console.log("Received /getAll request with:", req.body);

    if (!user_email) {
        return res.status(400).json({ error: 'User email is required' });
    }

    try {
        const applications = await Application.find({ user_email });
        console.log("Fetched applications:", applications);
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

module.exports = router;
