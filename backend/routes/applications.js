const express = require('express');
const Application = require('../models/application');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Save application data (protected route)
router.post('/apply', authenticate, async (req, res) => {
    const { is_careers_page, company, role_name, application_submitted, current_date, user_email } = req.body;

    // Remove the if condition once the latest chrome extension gets approved
    var isRoleNamePresent = (role_name.toLowerCase() != "no" && role_name.toLowerCase() != "na");

    if (is_careers_page != "na" && isRoleNamePresent) {
        console.log("Received /apply request with:", req.body);

        try {
            // Check if an application for this job already exists for the user
            const existingApplication = await Application.findOne({
                user_email,
                company,
                role_name
            });

            if (existingApplication) {
                // If the application already exists, return a message without saving it
                return res.status(400).json({ message: 'Application already exists for this job' });
            }

            // If no existing application, create a new one
            const newApplication = new Application({
                is_careers_page,
                company,
                role_name,
                application_submitted,
                current_date,
                user_email,
            });

            const savedApplication = await newApplication.save();
            res.status(201).json(savedApplication);
        } catch (error) {
            console.error('Error saving application:', error);
            res.status(500).json({ error: 'Failed to save application' });
        }
    } else {
        res.status(400).json({ message: 'Invalid job data' });
    }
});


// Fetch all applications (protected route)
router.post('/getAll', async (req, res) => {
    const user_email = req.body.user_email; // Get email from token

    try {
        const applications = await Application.find({ user_email });
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

module.exports = router;
