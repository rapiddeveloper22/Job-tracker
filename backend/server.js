const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // Enable CORS for preflight requests
app.use(bodyParser.json());


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

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/app', applicationRoutes); // Application-related routes

// Server Start
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


