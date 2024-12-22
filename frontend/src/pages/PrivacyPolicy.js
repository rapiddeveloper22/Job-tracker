import React from 'react';
import NavigationBar from '../components/NavigationBar'; // Adjust the path as per your file structure
import Footer from '../components/Footer'; // Adjust the path as per your file structure

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-black to-indigo-800 text-gray-300">
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl mx-auto p-8 bg-gray-800 rounded-xl shadow-xl mt-16 mb-10">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f6d] to-[#ffc3a0]">
                    Privacy Policy
                </h1>
                <p className="text-xl mb-6"><strong>Effective Date:</strong> December 6, 2024</p>
                <p className="text-lg mb-8">
                    At Automatic Job Tracker, your privacy is our priority. This policy explains how we collect, use, and
                    share your data when you use our service. By using our service, you consent to this privacy policy.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">How We Collect User Data</h2>
                <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
                    <li><strong>Data You Provide:</strong>
                        <ul className="list-inside text-gray-300">
                            <li>Email Address: Collected when you log in to sync and identify your account for job tracking purposes.</li>
                            <li>Authentication Token: Secured token generated during login to authenticate requests to our backend server.</li>
                        </ul>
                    </li>
                    <li><strong>Data Collected Automatically:</strong>
                        <ul className="list-inside text-gray-300">
                            <li>Job Application Details: Information such as company name, role, application status, and date, entered or extracted automatically when you interact with job application pages.</li>
                            <li>Browsing Data: The extension may temporarily access the active tab to detect and process job-related pages. No unrelated browsing data is collected or stored.</li>
                        </ul>
                    </li>
                    <li><strong>Storage Data:</strong> User preferences and cached data are stored locally on your device using Chrome’s storage.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">How We Use User Data</h2>
                <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
                    <li>Provide core features, including application recording and management.</li>
                    <li>Enhance functionality by analyzing usage patterns and resolving issues.</li>
                    <li>Authenticate user requests and secure data syncing with the backend.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">How We Share User Data</h2>
                <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
                    <li>With Backend Services: To securely store and manage your job tracking data.</li>
                    <li>With Legal Authorities: To comply with legal obligations or protect user rights and safety.</li>
                    <li>We do not share your data with third-party services for marketing or unrelated purposes.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">Parties Your Data Is Shared With</h2>
                <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
                    <li>Our Servers: To store and manage your job tracking data securely.</li>
                    <li>Your Browser: For locally storing user preferences and caching data.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">Data Retention and Security</h2>
                <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
                    <li>Data is retained as long as necessary to provide the service. You may request deletion of your data at any time.</li>
                    <li>We use industry-standard security measures, including HTTPS and encryption, to protect your data.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">Your Rights</h2>
                <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
                    <li><strong>Access and Deletion:</strong> You can access or delete your data by contacting us at autojobtracker@gmail.com.</li>
                    <li><strong>Uninstalling the Extension:</strong> Uninstalling the extension will stop any further data collection.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">Changes to This Privacy Policy</h2>
                <p className="text-lg mb-8">
                    We may update this policy to reflect changes in our practices or legal requirements. Updated policies will be posted
                    on this page with the revised effective date.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">Gmail Integration for Job Application Tracking</h2>
                <p className="text-lg mb-8">
                    To provide a seamless experience for tracking job applications, especially for mobile users, we integrate with Gmail.
                    When you apply for jobs via mobile, it becomes difficult for us to track your applications using browser extensions. To solve
                    this, we’ve developed a solution where we track job applications through the emails you receive after applying. This way, we can
                    accurately monitor and log your applications, ensuring that your job tracking is always up-to-date.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">Contact Information</h2>
                <p className="text-lg">
                    If you have questions or concerns about this policy, please contact us at:
                    <br />
                    <strong>Email:</strong> autojobtracker@gmail.com
                </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
