const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = express.Router();
const User = require('../models/user');

// Load environment variables
dotenv.config();

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Email Template Function
const getEmailTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Request Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #4a90e2;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
        }
        .email-body h2 {
            color: #4a90e2;
        }
        .email-body p {
            margin: 15px 0;
        }
        .cta-button {
            display: inline-block;
            background-color: #f5a623;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin: 20px 0;
        }
        .cta-button:hover {
            background-color: #e59520;
        }
        .email-footer {
            background-color: #f1f1f1;
            color: #666;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
        .email-footer a {
            color: #4a90e2;
            text-decoration: none;
        }
        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>🌟 We Value Your Feedback!</h1>
        </div>
        <div class="email-body">
            <h2>Hello,</h2>
            <p>Thank you for choosing <strong>Jobossy</strong> to simplify your job search. We’re committed to helping you succeed, and your feedback is vital in making that happen!</p>
            <p>
                Could you spare a minute to review us on the <strong>Chrome Web Store</strong>? Your insights will help us improve and reach more job seekers like you.
            </p>
            <a href="https://chromewebstore.google.com/detail/jobossy/ikbklofpkopbljohhajgiohhkpcdfege" class="cta-button">Leave a Review</a>
            <p>
                We’re also working on exciting updates and would love to hear your thoughts. What features or enhancements would make Jobossy even better for you?
            </p>
            <p>
                As a token of our appreciation, top reviewers will receive <strong>exclusive early access</strong> to upcoming features. Don’t miss out!
            </p>
        </div>
        <div class="email-footer">
            <p>Thank you for being part of the Jobossy family! 💼</p>
            <p>
                Have suggestions? Reply directly to this email or visit our <a href="https://www.jobossy.xyz">website</a>.
            </p>
        </div>
    </div>
</body>
</html>
`;

router.post('/sendFeedbackEmails', async (req, res) => {
    try {
        const users = await User.find();

        for (const user of users) {
            const { email } = user;

            const mailOptions = {
                from: `"Jobossy Team" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'We Value Your Feedback - Share Your Thoughts!',
                html: getEmailTemplate(),
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(200).send('Emails sent successfully!');
    } catch (err) {
        console.error('Error sending emails:', err);
        res.status(500).send('Failed to send emails.');
    }
});

module.exports = router;
