import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Footer Content with Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Support & Feedback Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-indigo-400">Support & Feedback</h3>
                        <p className="text-gray-300">We're here to help. Feel free to reach out with any questions or feedback.</p>
                        <div className="space-y-2">
                            <Link to="/support" className="text-lg text-indigo-300 hover:text-indigo-400">Support</Link>
                            <Link to="/contact" className="text-lg text-indigo-300 hover:text-indigo-400">Contact Us</Link>
                            <Link to="/feedbackForm" className="text-lg text-indigo-300 hover:text-indigo-400">Give Feedback</Link>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-indigo-400">Follow Us</h3>
                        <div className="flex justify-center sm:justify-start space-x-6">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-3xl text-indigo-400 hover:text-indigo-500">
                                <FaTwitter />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-3xl text-indigo-400 hover:text-indigo-500">
                                <FaFacebookF />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-3xl text-indigo-400 hover:text-indigo-500">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-3xl text-indigo-400 hover:text-indigo-500">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="space-y-4 text-left pl-0">
                        <h3 className="text-xl font-semibold text-indigo-400">Quick Links</h3>
                        <div className="space-y-2">
                            <Link to="/aboutUs" className="text-lg text-indigo-300 hover:text-indigo-400 block">About Us</Link>
                            <Link to="/termsOfService" className="text-lg text-indigo-300 hover:text-indigo-400 block">Terms of Service</Link>
                            <Link to="/privacyPolicy" className="text-lg text-indigo-300 hover:text-indigo-400 block">Privacy Policy</Link>
                            <Link to="/faq" className="text-lg text-indigo-300 hover:text-indigo-400 block">FAQ</Link>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom (Copyright Section) */}
                <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Jobossy. All rights reserved.</p>
                </div>

                {/* Optional: A small note about the team */}
                <div className="text-center text-sm text-gray-400 mt-2">
                    <p>Made with 💙 by the Jobossy team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
