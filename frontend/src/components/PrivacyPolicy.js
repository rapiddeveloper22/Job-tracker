import React from 'react';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> December 6, 2024</p>
            <p>
                At Automatic Job Tracker, your privacy is our priority. This policy explains how we collect, use, and
                share your data when you use our Chrome Extension. By using the extension, you consent to this privacy policy.
            </p>
            <h2>How We Collect User Data</h2>
            <ul>
                <li>
                    <strong>Data You Provide:</strong>
                    <ul>
                        <li>Email Address: Collected when you log in to sync and identify your account for job tracking purposes.</li>
                        <li>Authentication Token: Secured token generated during login to authenticate requests to our backend server.</li>
                    </ul>
                </li>
                <li>
                    <strong>Data Collected Automatically:</strong>
                    <ul>
                        <li>Job Application Details: Information such as company name, role, application status, and date, entered or extracted automatically when you interact with job application pages.</li>
                        <li>Browsing Data: The extension may temporarily access the active tab to detect and process job-related pages. No unrelated browsing data is collected or stored.</li>
                    </ul>
                </li>
                <li>
                    <strong>Storage Data:</strong> User preferences and cached data are stored locally on your device using Chrome’s storage.
                </li>
            </ul>
            <h2>How We Use User Data</h2>
            <ul>
                <li>Provide core features, including application recording and management.</li>
                <li>Enhance functionality by analyzing usage patterns and resolving issues.</li>
                <li>Authenticate user requests and secure data syncing with the backend.</li>
            </ul>
            <h2>How We Share User Data</h2>
            <ul>
                <li>With Backend Services: To securely store and manage your job tracking data.</li>
                <li>With Legal Authorities: To comply with legal obligations or protect user rights and safety.</li>
                <li>We do not share your data with third-party services for marketing or unrelated purposes.</li>
            </ul>
            <h2>Parties Your Data Is Shared With</h2>
            <ul>
                <li>Our Servers: To store and manage your job tracking data securely.</li>
                <li>Your Browser: For locally storing user preferences and caching data.</li>
            </ul>
            <h2>Data Retention and Security</h2>
            <ul>
                <li>Data is retained as long as necessary to provide the service. You may request deletion of your data at any time.</li>
                <li>We use industry-standard security measures, including HTTPS and encryption, to protect your data.</li>
            </ul>
            <h2>Your Rights</h2>
            <ul>
                <li>
                    <strong>Access and Deletion:</strong> You can access or delete your data by contacting us at autojobtracker@gmail.com.
                </li>
                <li>
                    <strong>Uninstalling the Extension:</strong> Uninstalling the extension will stop any further data collection.
                </li>
            </ul>
            <h2>Changes to This Privacy Policy</h2>
            <p>
                We may update this policy to reflect changes in our practices or legal requirements. Updated policies will be posted
                on this page with the revised effective date.
            </p>
            <h2>Contact Information</h2>
            <p>
                If you have questions or concerns about this policy, please contact us at:
                <br />
                <strong>Email:</strong> autojobtracker@gmail.com
            </p>
        </div>
    );
};

export default PrivacyPolicy;
