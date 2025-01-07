import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi'; // Logout icon
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for mobile menu toggle

const NavigationBar = () => {
    const location = useLocation(); // Get the current location (route)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for toggling mobile menu

    // Check if the user is logged in by checking the localStorage for authToken
    const isLoggedIn = localStorage.getItem('authToken') !== null;

    // Check if the current route is the About Us page
    const isAboutUsPage = location.pathname === '/aboutUs';
    const LandingPage = location.pathname === '/';

    return (
        <nav
            className={`top-0 left-0 w-full z-50 ${isAboutUsPage || LandingPage
                ? 'bg-[#111]'
                : 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg'
                }`}
        >
            <div className="flex justify-between items-center py-4 px-4 md:px-8">
                {/* Logo */}
                <Link to="/">
                    <h1
                        className="text-3xl font-bold ml-2"
                        style={{
                            fontFamily: 'Koulen',
                            color: isAboutUsPage || LandingPage ? '#f6f6f6' : '#f6f6f6',
                        }}
                    >
                        Jobossy
                    </h1>
                </Link>

                {/* Hamburger Menu Icon (visible on small screens) */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-300 text-2xl"
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex space-x-10">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                    ? 'text-gray-100'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/howtoUse"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                    ? 'text-gray-100'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                How To Use
                            </Link>
                            {/* <Link
                                to="/applications"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                        ? 'text-gray-100'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Applications
                            </Link>
                            <Link
                                to="/settings"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                        ? 'text-gray-100'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Settings
                            </Link> */}
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                    ? 'text-gray-100'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                    ? 'text-gray-100'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/howToUse"
                                className={`text-lg font-bold transition duration-300 ${isAboutUsPage || LandingPage
                                    ? 'text-gray-100'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                How To Use
                            </Link>
                        </>
                    )}
                </div>

                {/* Logout Button - Only shown when logged in */}
                {isLoggedIn && (
                    <Link
                        to="/login"
                        className={`hidden md:flex items-center py-2 px-5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition duration-300 shadow-md ${isAboutUsPage ? 'bg-transparent' : ''
                            }`}
                        onClick={() => {
                            localStorage.removeItem('authToken');
                            localStorage.removeItem('isGmailConnected');
                            localStorage.removeItem('userEmail');
                        }}
                    >
                        <HiLogout className="mr-2 text-lg" />
                        Logout
                    </Link>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900 text-gray-300">
                    <div className="flex flex-col space-y-4 p-6">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/howToUse"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    How To Use
                                </Link>
                                {/* <Link
                                    to="/applications"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Applications
                                </Link>
                                <Link
                                    to="/settings"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Settings
                                </Link> */}
                                <Link
                                    to="/login"
                                    className="flex items-center py-2 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition duration-300 shadow-md"
                                    onClick={() => {
                                        localStorage.removeItem('authToken');
                                        localStorage.removeItem('isGmailConnected');
                                        localStorage.removeItem('userEmail');
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <HiLogout className="mr-2" />
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/howToUse"
                                    className="text-lg font-bold hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    How To Use
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationBar;
