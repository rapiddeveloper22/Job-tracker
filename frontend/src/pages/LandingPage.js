import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Footer from '../components/Footer';
import NavigationBar from "../components/NavigationBar";

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = React.memo(({ title, description }) => (
    <div className="feature-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold text-pink-400 mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
));

const LandingPage = () => {
    useEffect(() => {
        // Set up animations
        const timeline = gsap.timeline();

        timeline.fromTo(".hero-content h1", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" })
            .fromTo(".hero-content p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.5, ease: "power2.out" });

        gsap.set(".feature-card, .testimonial-card, .future-features-card", { opacity: 1 });

        gsap.fromTo(
            ".feature-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1, stagger: 0.3,
                scrollTrigger: {
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
                opacity: 1, y: 0, duration: 1, stagger: 0.3,
                scrollTrigger: {
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
                opacity: 1, y: 0, duration: 1, stagger: 0.3,
                scrollTrigger: {
                    trigger: ".future-features-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            }
        );

        // Cleanup ScrollTrigger instances to prevent memory leaks
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-gray-100 font-sans">
            <head>
                <title>Supercharge Your Job Hunt with Jobossy</title>
                <meta name="description" content="Effortlessly track and organize your job applications with Jobossy. Save time and get AI-powered assistance for the ultimate job search experience." />
                <meta name="keywords" content="job tracking, job search automation, AI job suggestions, resume builder, job application tracker" />
                <meta name="author" content="Jobossy Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="Supercharge Your Job Hunt with Jobossy" />
                <meta property="og:description" content="Effortlessly track and organize your job applications with Jobossy. Save time and get AI-powered assistance for the ultimate job search experience." />
                <meta property="og:image" content="https://jobossy.xyz/images/landing-page-hero.png" />
                <meta property="og:url" content="https://jobossy.xyz/" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Supercharge Your Job Hunt with Jobossy" />
                <meta name="twitter:description" content="Effortlessly track and organize your job applications with Jobossy." />
                <meta name="twitter:image" content="https://jobossy.xyz/images/landing-page-hero.png" />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Supercharge Your Job Hunt",
                        "description": "Effortlessly track and organize your job applications with Jobossy.",
                        "url": "https://jobossy.xyz/",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Jobossy",
                            "url": "https://jobossy.xyz/",
                            "logo": "https://jobossy.xyz/images/logo.png"
                        }
                    })}
                </script>

                {/* Canonical URL */}
                <link rel="canonical" href="https://jobossy.xyz/" />
            </head>

            <NavigationBar />

            {/* Hero Section */}
            <section className="hero-section py-32 flex flex-col items-center justify-center text-center flex-grow">
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

            {/* Future Features Section */}
            <section className="future-features-section py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-indigo-900 opacity-80"></div>
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
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-indigo-900 opacity-80"></div>
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
                                “I saved so much time and stress by automating my applications!”
                            </p>
                            <h4 className="text-teal-400 font-semibold">- Julian</h4>
                        </div>
                        <div className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                            <p className="text-lg text-gray-200 italic mb-4">
                                “This tool made my job hunt effortless and efficient.”
                            </p>
                            <h4 className="text-teal-400 font-semibold">- Nandini</h4>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
