import React from 'react';
import NavigationBar from '../components/NavigationBar'; // Adjust the path as per your project structure
import Footer from '../components/Footer'; // Adjust the path as per your project structure

const TermsOfService = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-black to-indigo-800 text-gray-300">
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Main Content */}
            <div className="flex-1 max-w-4xl mx-auto p-8 bg-gray-800 rounded-xl shadow-xl mt-16 mb-10">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f6d] to-[#ffc3a0]">
                    Terms of Service
                </h1>
                <p className="text-xl mb-6"><strong>Effective Date:</strong> December 6, 2024</p>
                <p className="text-lg mb-8">
                    By using Automatic Job Tracker and our services, you agree to comply with and be bound by the following terms and conditions.
                    Please review them carefully. If you do not agree to these terms, you should not use our services.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">1. Acceptance of Terms</h2>
                <p className="text-lg mb-6">
                    By accessing or using Automatic Job Tracker, you agree to these Terms of Service. We may update or modify these terms at any time,
                    and we will post the updated terms on this page. Your continued use of our service after such changes constitutes your acceptance of the updated terms.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">2. Use of Our Service</h2>
                <p className="text-lg mb-6">
                    You agree to use Automatic Job Tracker solely for personal, non-commercial purposes. You are responsible for ensuring that your use of
                    the service complies with all applicable laws and regulations.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">3. User Account</h2>
                <p className="text-lg mb-6">
                    To use certain features of the service, you may need to create an account. You agree to provide accurate and complete information during the
                    registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">4. Data Collection and Privacy</h2>
                <p className="text-lg mb-6">
                    We respect your privacy and are committed to protecting your personal information. Our privacy practices are described in our Privacy Policy,
                    which governs the collection, use, and disclosure of your data.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">5. Restrictions</h2>
                <p className="text-lg mb-6">
                    You may not use Automatic Job Tracker for any unlawful, harmful, or fraudulent purposes. You also agree not to engage in any activity that
                    could damage, disable, overburden, or impair the service or interfere with others' use of the service.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">6. Service Availability</h2>
                <p className="text-lg mb-6">
                    We strive to provide reliable and continuous service, but we cannot guarantee that the service will be error-free or always available.
                    We reserve the right to suspend or terminate the service at any time for maintenance, updates, or other reasons.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">7. Termination</h2>
                <p className="text-lg mb-6">
                    We may terminate or suspend your access to Automatic Job Tracker at our sole discretion, without notice, for any violation of these terms or
                    other conduct that we deem harmful to our service or other users.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">8. Limitation of Liability</h2>
                <p className="text-lg mb-6">
                    To the extent permitted by law, we will not be liable for any indirect, incidental, special, or consequential damages arising from your use
                    of Automatic Job Tracker. Our total liability is limited to the amount you paid for using the service.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">9. Indemnification</h2>
                <p className="text-lg mb-6">
                    You agree to indemnify and hold harmless Automatic Job Tracker and its affiliates, officers, and employees from any claims, losses,
                    damages, or expenses arising from your use of the service or your violation of these terms.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">10. Governing Law</h2>
                <p className="text-lg mb-6">
                    These terms are governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its
                    conflict of law principles. Any disputes will be resolved in the courts located in that jurisdiction.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">11. Changes to These Terms</h2>
                <p className="text-lg mb-6">
                    We may update these Terms of Service from time to time. All updates will be posted on this page, and the updated terms will take effect
                    immediately upon posting. We encourage you to review these terms regularly.
                </p>

                <h2 className="text-2xl font-semibold text-gray-100 mb-6">12. Contact Information</h2>
                <p className="text-lg">
                    If you have any questions or concerns about these Terms of Service, please contact us at:
                    <br />
                    <strong>Email:</strong> autojobtracker@gmail.com
                </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default TermsOfService;
