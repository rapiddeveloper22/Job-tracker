import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import jobtracking from "../assets/jobtracking.json";

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 animate-gradient-xy h-full w-full"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                    Welcome to <span className="text-indigo-500">AutoJobTracker</span>
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
                    Automate job applications, analyze results, and optimize your career journey.
                </p>
                <Link
                    to="/login"
                    className="px-6 py-3 bg-indigo-600 hover:bg-purple-600 rounded-full text-white font-semibold transition-shadow shadow-lg hover:shadow-xl"
                >
                    Get Started
                </Link>
                <div className="mt-10 w-full max-w-2xl">
                    <Lottie animationData={jobtracking} loop={true} />
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-20 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
                    <span className="text-indigo-400">Why Choose</span> AutoJobTracker?
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "AI-Powered Insights",
                            description:
                                "Leverage advanced AI analytics to monitor and enhance your job application performance.",
                            icon: "📊",
                        },
                        {
                            title: "Automated Applications",
                            description:
                                "Seamlessly apply to multiple jobs with a single click and save valuable time.",
                            icon: "🤖",
                        },
                        {
                            title: "Data Security",
                            description:
                                "Your personal data is encrypted and stored securely to ensure complete privacy.",
                            icon: "🔒",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-xl p-6 text-center hover:scale-105 transition-transform shadow-lg"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative z-10 bg-gradient-to-r from-indigo-700 to-purple-800 py-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Dream Job Is Just a Click Away
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                    Let AutoJobTracker simplify your job-hunting journey and achieve your career goals.
                </p>
                <Link
                    to="/login"
                    className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-200 shadow-lg hover:shadow-xl transition-transform"
                >
                    Sign Up Now
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-500 py-6 text-center">
                <p>&copy; {new Date().getFullYear()} AutoJobTracker. All rights reserved.</p>
                <p className="mt-2">
                    <Link
                        to="/privacy-policy"
                        className="text-indigo-400 hover:text-indigo-600"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
