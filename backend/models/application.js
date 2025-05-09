const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    is_careers_page: { type: String, required: true },
    user_email: { type: String, required: true },
    company: { type: String, required: true },
    role_name: { type: String, required: true },
    application_submitted: { type: String, required: true },
    current_date: { type: String, required: true },
    tags: { type: [String], default: [] }, // Add tags field
    notes: { type: String, default: '' },  // Add notes field
    job_link: { type: String },
}, { strict: false });

module.exports = mongoose.model('Application', applicationSchema);
