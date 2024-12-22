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
                markers: true  // Optional for debugging
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
                markers: true  // Optional for debugging
            }
        });

        // Clean up ScrollTrigger instances to prevent memory leaks
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-gray-100 font-sans">
            <NavigationBar />

            {/* Hero Section */}
            <section className="hero-section flex flex-col items-center justify-center text-center py-32 w-full h-screen">
                <div className="hero-content max-w-4xl mx-auto">
                    <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Our Journey
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        What began as a vision has turned into a mission: to transform the way people approach their job search.
                    </p>
                </div>
            </section>

            {/* Why We Started Section */}
            <section className="why-we-started py-32 px-8 bg-gray-900 w-full h-screen">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center content">
                    <div className="md:w-1/2">
                        {/* Lightbulb SVG with dynamic color change */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="w-full h-auto mx-auto"
                        >
                            <g fill="none" stroke="#F5A623" strokeWidth="4">
                                <circle cx="32" cy="20" r="14" />
                                <line x1="32" y1="38" x2="32" y2="46" />
                                <path d="M24,46 h16" />
                            </g>
                            <circle cx="32" cy="14" r="2" fill="#F5A623" />
                            <path
                                d="M32 50c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5z"
                                fill="#F5A623"
                            />
                        </svg>
                    </div>
                    <div className="md:w-1/2 text-center md:text-left mt-12 md:mt-0">
                        <h2 className="text-4xl font-bold text-pink-500 mb-4">Why We Started</h2>
                        <p className="text-gray-300 text-lg">
                            The idea for Jobossy came from our own struggle to stay organized during the job application process.
                            With so many platforms and applications to keep track of, it became clear that something was missing.
                            Jobossy was created to simplify this process, automate key tasks, and give users peace of mind as they
                            navigate their job search.
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
                            To become the go-to platform for job seekers worldwide by creating tools that remove barriers, automate
                            workflows, and foster confidence. Your dream job is just an organized search away.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        {/* Teamwork SVG with dynamic color change */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            className="w-full h-auto mx-auto"
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

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUsPage;
