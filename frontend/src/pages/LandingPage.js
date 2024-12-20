import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
    // const particlesInit = useCallback(async (engine) => {
    //     await loadFull(engine);
    // }, []);

    useEffect(() => {
        gsap.fromTo(
            ".hero-content h1",
            {
                opacity: 0, // Start fully transparent
                y: -50,
            },
            {
                opacity: 1, // Fade in to fully opaque
                y: 0,
                duration: 1,
                ease: "power2.out",
            }
        );

        gsap.fromTo(
            ".hero-content p",
            {
                opacity: 0, // Start fully transparent
                y: 20,
            },
            {
                opacity: 1, // Fade in to fully opaque
                y: 0,
                duration: 1,
                delay: 0.5,
                ease: "power2.out",
            }
        );

        gsap.set(".feature-card, .testimonial-card, .future-features-card", { opacity: 1 });

        gsap.fromTo(
            ".feature-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1.5, stagger: 0.3, scrollTrigger: {
                    trigger: ".features-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            }
        );

        gsap.fromTo(
            ".testimonial-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1.5, stagger: 0.3, scrollTrigger: {
                    trigger: ".testimonials-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            }
        );

        gsap.fromTo(
            ".future-feature-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1.5, stagger: 0.3, scrollTrigger: {
                    trigger: ".future-features-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-gray-100 font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full py-6 px-10 flex justify-between items-center z-10 bg-opacity-70 text-white">
                {/* Logo Section */}
                <div className="flex items-center flex-shrink-0">
                    <img
                        src={require('../assets/Logo.png')}
                        alt="Job Tracker Logo"
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-20" // Adjust height/width as needed
                    />
                </div>
                <nav className="space-x-6">
                    <Link to="/login" className="text-lg text-gray-100 hover:text-indigo-300">Login</Link>
                    <Link to="/signup" className="text-lg text-gray-100 hover:text-indigo-300">Signup</Link>
                    <Link to="/how-to-use" className="text-lg text-gray-100 hover:text-indigo-300">How To Use</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero-section py-32 flex flex-col items-center justify-center text-center">
                <div className="hero-content max-w-4xl mx-auto">
                    <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Supercharge Your Job Hunt!
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                        Say goodbye to scattered applications! Automatically track, organize, and stay ahead in your job search.
                    </p>
                    <Link
                        to="/signup"
                        className="cta-button bg-gradient-to-r from-pink-600 to-purple-500 text-white py-3 px-8 rounded-lg font-bold hover:opacity-90"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-24 bg-gray-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-indigo-900 opacity-80"></div> {/* Background overlay */}
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h2 className="font-bold mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-fadeIn">
                        Why Choose Us
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="feature-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4">Track Your Applications</h3>
                            <p className="text-gray-300">
                                Easily track every job you apply to, keeping a detailed record of each step in the process.
                            </p>
                        </div>
                        <div className="feature-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4">Stay Organized</h3>
                            <p className="text-gray-300">
                                Keep all your job applications organized in one simple dashboard, making it easy to follow up and stay on track.
                            </p>
                        </div>
                        <div className="feature-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4">Time-saving Automation</h3>
                            <p className="text-gray-300">
                                Reduce the stress of manual tracking. We automate the process so you can focus on preparing for interviews.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Features Section */}
            <section className="future-features-section py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-indigo-900 opacity-80"></div> {/* Background overlay */}
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h2 className="font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Coming Soon: Future Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="future-feature-card bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4">AI-Powered Job Suggestions</h3>
                            <p className="text-gray-300">
                                Based on your application history, we’ll suggest new jobs tailored to your skills and preferences.
                            </p>
                        </div>
                        <div className="future-feature-card bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4">Personalized Resume Builder</h3>
                            <p className="text-gray-300">
                                Create professional resumes with AI assistance, tailored to each job you apply to for the best chances of success.
                            </p>
                        </div>
                        <div className="future-feature-card bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <h3 className="text-2xl font-semibold text-pink-400 mb-4">Interview Preparation</h3>
                            <p className="text-gray-300">
                                Get personalized tips and mock interview questions to help you prepare for your next big opportunity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-indigo-900 opacity-80"></div> {/* Background overlay */}
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h2 className="font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
                        What People Are Saying
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                            <p className="text-lg text-gray-200 italic mb-4">
                                “This tool made my job hunt effortless and efficient.”
                            </p>
                            <h4 className="text-teal-400 font-semibold">- Nandini</h4>
                        </div>
                        <div className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                            <p className="text-lg text-gray-200 italic mb-4">
                                “The best job application tracker out there!”
                            </p>
                            <h4 className="text-teal-400 font-semibold">- Dhakshinamurthy</h4>
                        </div>
                        <div className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                            <p className="text-lg text-gray-200 italic mb-4">
                                “Highly recommend it to all job seekers.”
                            </p>
                            <h4 className="text-teal-400 font-semibold">- Mental Balamurugan</h4>
                        </div>
                    </div>
                </div>
            </section>



            {/* Footer */}
            <footer className="py-6 text-center text-gray-400 bg-gradient-to-r from-gray-800 via-black to-indigo-900 opacity-80">
                <p>&copy; 2024 Job Tracker. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <Link to="/privacyPolicy" className="hover:text-gray-100">Privacy Policy</Link>
                    <Link to="/support" className="hover:text-gray-100">Support</Link>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
