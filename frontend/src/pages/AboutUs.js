import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
    useEffect(() => {
        // Hero Section Animation - Fade and Slide Up
        gsap.fromTo(".hero-content h1", {
            opacity: 0,
            y: -50
        }, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.fromTo(".hero-content p", {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Why We Started Section Animation with Color Change
        gsap.fromTo(".why-we-started .content", {
            opacity: 0,
            x: -100
        }, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: ".why-we-started",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.fromTo(".why-we-started svg", {
            opacity: 0,
            scale: 0.5,
            fill: "#F5A623"  // Initial color
        }, {
            opacity: 1,
            scale: 1,
            fill: "#F5A623",  // Color stays same initially
            duration: 1.5,
            delay: 0.5,
            scrollTrigger: {
                trigger: ".why-we-started",
                start: "top 80%",
                toggleActions: "play none none none",
                scrub: 1,  // This makes the color change follow the scroll position
            }
        });

        // Vision Section with Color Change on Scroll
        gsap.fromTo(".vision .content", {
            opacity: 0,
            x: 100
        }, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: ".vision",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.fromTo(".vision svg", {
            opacity: 0,
            scale: 0.5,
            fill: "#4A90E2"  // Initial color
        }, {
            opacity: 1,
            scale: 1,
            fill: "#4A90E2",  // Color stays same initially
            duration: 1.5,
            delay: 0.5,
            scrollTrigger: {
                trigger: ".vision",
                start: "top 80%",
                toggleActions: "play none none none",
                scrub: 1,  // Scroll-based color transition
            }
        });

        // Clean up ScrollTrigger instances to prevent memory leaks
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-gray-100 font-sans">
            {/* SEO Tags */}
            <head>
                <title>About Us | Jobossy - Simplify Your Job Search</title>
                <meta
                    name="description"
                    content="Discover Jobossy's journey, mission, vision, and the story behind why we started. Learn how we aim to transform job searches worldwide."
                />
                <meta
                    name="keywords"
                    content="Jobossy, job search, automation, about us, mission, vision, career platform, job applications, insights"
                />
                <meta name="author" content="Jobossy Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="About Us | Jobossy" />
                <meta property="og:description" content="Learn about the story behind Jobossy and how we're transforming job searches globally." />
                <meta property="og:image" content="https://jobossy.xyz/images/about-us-hero.jpg" />
                <meta property="og:url" content="https://jobossy.xyz/about-us" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | Jobossy" />
                <meta name="twitter:description" content="Discover the mission and vision behind Jobossy, transforming job searches worldwide." />
                <meta name="twitter:image" content="https://jobossy.xyz/images/about-us-hero.jpg" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "About Us",
                        "description": "Learn about Jobossy's mission and vision to simplify and enhance job searches globally.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Jobossy",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://jobossy.xyz/images/logo.png"
                            }
                        }
                    })}
                </script>

                {/* Canonical URL */}
                <link rel="canonical" href="https://jobossy.xyz/about-us" />
            </head>

            <NavigationBar />

            <main>
                {/* Hero Section */}
                <section className="hero-section flex flex-col items-center justify-center text-center py-32 w-full h-screen">
                    <div className="hero-content max-w-4xl mx-auto">
                        <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Our Journey
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Transforming job searches with automation, insights, and tools tailored for success.
                        </p>
                    </div>
                </section>

                {/* Why We Started Section */}
                <section className="why-we-started py-32 px-8 bg-gray-900 w-full h-screen">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center content">
                        <div className="md:w-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                className="w-full h-auto mx-auto"
                                aria-label="Lightbulb representing idea behind Jobossy"
                            >
                                <g fill="none" stroke="#F5A623" strokeWidth="4">
                                    <circle cx="32" cy="20" r="14" />
                                    <line x1="32" y1="38" x2="32" y2="46" />
                                    <path d="M24,46 h16" />
                                </g>
                            </svg>
                        </div>
                        <div className="md:w-1/2 text-center md:text-left mt-12 md:mt-0">
                            <h2 className="text-4xl font-bold text-pink-500 mb-4">Why We Started</h2>
                            <p className="text-gray-300 text-lg">
                                Jobossy was born from our personal struggles of managing multiple applications on different job boards.
                                Our mission is to bring simplicity and confidence to job seekers worldwide.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="vision py-32 px-8 bg-gradient-to-r from-purple-500 via-black to-indigo-900 w-full h-screen">
                    <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center content">
                        <div className="md:w-1/2 text-center md:text-left mt-12 md:mt-0">
                            <h2 className="text-4xl font-bold text-pink-400 mb-4">Our Vision</h2>
                            <p className="text-gray-300 text-lg">
                                We aim to create a globally trusted platform that empowers job seekers with automation,
                                insights, and tools that turn job hunting into a streamlined experience.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                className="w-full h-auto mx-auto"
                                aria-label="Teamwork representing Jobossy's vision"
                            >
                                <circle cx="25" cy="50" r="20" fill="#4A90E2" />
                                <circle cx="75" cy="50" r="20" fill="#F5A623" />
                                <path
                                    d="M 25,50 C 40,50 60,50 75,50"
                                    stroke="#333"
                                    strokeWidth="5"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutUsPage;
