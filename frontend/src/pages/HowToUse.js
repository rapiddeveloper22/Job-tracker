import React from "react";
import { FaDownload, FaUserPlus, FaSearch, FaChartLine } from "react-icons/fa"; // Icons for steps

const HowToUse = () => {
    return (
        <div className="min-h-screen text-gray-200">
            {/* Header */}
            <header className="w-full bg-opacity-80 bg-black text-white py-6 px-12 shadow-lg fixed top-0 left-0 z-50">
                <h1 className="text-4xl font-extrabold tracking-wide text-center bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                    How To Use Job Tracker
                </h1>
            </header>

            {/* Main Content */}
            <main className="px-6 py-12 max-w-6xl mx-auto pt-24 space-y-16">
                {/* Getting Started Section */}
                <section>
                    <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                        Getting Started
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Step 1 */}
                        <div className="flex items-center gap-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <div className="text-orange-400 text-5xl">
                                <FaDownload />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400">
                                    Step 1: Install Extension
                                </h3>
                                <p className="text-gray-300">
                                    Download the Job Tracker extension from the Chrome Web Store.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center gap-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <div className="text-pink-400 text-5xl">
                                <FaUserPlus />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400">
                                    Step 2: Create an Account
                                </h3>
                                <p className="text-gray-300">
                                    Log in to your account or create a new account to get started.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center gap-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <div className="text-blue-400 text-5xl">
                                <FaSearch />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400">
                                    Step 3: Browse Jobs
                                </h3>
                                <p className="text-gray-300">
                                    Visit a job board like LinkedIn, and our extension will detect job details for you.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-center gap-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <div className="text-green-400 text-5xl">
                                <FaChartLine />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-teal-400">
                                    Step 4: Track Applications
                                </h3>
                                <p>
                                    Track your applications and gain insights into your job search journey by visiting {" "}
                                    <a href="https://job-tracker-3fgd.onrender.com/dashboard"
                                        className="text-yellow-400 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        your dashboard here
                                    </a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center mt-12">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6">
                        Ready to Simplify Your Job Search?
                    </h2>
                    <a
                        href="https://chromewebstore.google.com/detail/automatic-job-tracker/ikbklofpkopbljohhajgiohhkpcdfege" // Replace with your extension link
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="px-8 py-3 font-semibold text-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
                            Install Job Tracker Now
                        </button>
                    </a>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black text-gray-400 py-8 text-center">
                <p>
                    Need help? Contact us at
                    <a
                        href="mailto:autojobtracker@gmail.com"
                        className="text-teal-400 hover:underline"
                    >
                        autojobtracker@gmail.com
                    </a>
                </p>
            </footer>
        </div >
    );
};

export default HowToUse;
