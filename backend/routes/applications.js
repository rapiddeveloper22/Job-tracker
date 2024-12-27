const express = require('express');
const Application = require('../models/application');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Save application data (protected route)
router.post('/apply', authenticate, async (req, res) => {
    const { is_careers_page, company, role_name, application_submitted, current_date, user_email } = req.body;

    // Remove the if condition once the latest chrome extension gets approved
    var isRoleNamePresent = (role_name.toLowerCase() != "no" && role_name.toLowerCase() != "na");
    var isApplicationSubmitted = (application_submitted.toLowerCase() != "no")

    if (is_careers_page != "na" && isRoleNamePresent && isApplicationSubmitted) {
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

// Update application data (protected route)
router.put('/updateApplication', authenticate, async (req, res) => {
    const { id, userEmail, updatedFields } = req.body;

    try {
        // Find the application by ID and check if the user_email matches
        const application = await Application.findOne({ _id: id });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.user_email !== userEmail) {
            return res.status(403).json({ message: 'Unauthorized access to update this application' });
        }

        // Update the application fields
        Object.keys(updatedFields).forEach((key) => {
            console.log(`Key: ${key}, Application Value: ${application[key]}, Updated Value: ${updatedFields[key]}`);
            application[key] = updatedFields[key];
        });

        // Save the updated application
        const updatedApplication = await application.save();
        console.log(updatedApplication);
        res.json(updatedApplication); // Return the updated application data
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ error: 'Failed to update application' });
    }
});

module.exports = router;
