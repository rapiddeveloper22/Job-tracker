import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg mx-6 mt-6">
            <div className="container mx-auto px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-[#ff0088] to-[#ff8800] bg-clip-text hover:opacity-90 transition duration-300"
                >
                    JobTracker
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-10">
                    <Link
                        to="/dashboard"
                        className="text-gray-300 hover:text-white text-lg font-medium transition duration-300"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/applications"
                        className="text-gray-300 hover:text-white text-lg font-medium transition duration-300"
                    >
                        Applications
                    </Link>
                    <Link
                        to="/settings"
                        className="text-gray-300 hover:text-white text-lg font-medium transition duration-300"
                    >
                        Settings
                    </Link>
                </div>

                {/* Logout Button */}
                <Link
                    to="/login"
                    className="py-2 px-6 rounded-full bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-white font-medium hover:opacity-90 transition duration-300 shadow-md"
                >
                    Logout
                </Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
