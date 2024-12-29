const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
const allowedOrigins = [
    'https://jobossy.vercel.app',  // Frontend URL 1
    'https://www.jobossy.xyz', // Frontend URL 2
    'http://localhost:3001'  // Localhost URL for local testing (adjust the port if needed)
];

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
}); // Enable CORS for preflight requests

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// MongoDB Connection
mongoose.connect('mongodb+srv://mmaswin22:bRTITTtZXOIH8Op4@cluster0.malig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const scrapeRoutes = require('./routes/scrape');
const aiRoutes = require('./routes/ai');

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/app', applicationRoutes); // Application-related routes
app.use('/api/scrape', scrapeRoutes);
app.use('/api/ai', aiRoutes);

// Server Start
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


