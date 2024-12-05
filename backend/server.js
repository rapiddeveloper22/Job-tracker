const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://mmaswin22:bRTITTtZXOIH8Op4@cluster0.malig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'));

// Routes
app.use('/api/dashboard/auth', authRoutes);
app.use('/api/dashboard/app', applicationRoutes);

// Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
