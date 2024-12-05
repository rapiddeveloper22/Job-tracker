const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role_name: { type: String, required: true },
    application_submitted: { type: String, required: true },
    current_date: { type: String, required: true },
    user_email: { type: String, required: true },
});

module.exports = mongoose.model('Application', ApplicationSchema);
