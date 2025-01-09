import React from "react";
import { FaDownload, FaUserPlus, FaSearch, FaChartLine } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const HowToUse = () => {
    return (
        <div className="min-h-screen text-gray-200">
            {/* SEO Meta Tags */}
            <head>
                <title>How to Use Jobossy | Simplify Your Job Search</title>
                <meta
                    name="description"
                    content="Learn how to use Jobossy to supercharge your job search. Install the extension, create an account, track applications, and gain insights with ease."
                />
                <meta
                    name="keywords"
                    content="Jobossy, job search, track job applications, install extension, how-to guide, job hunt automation"
                />
                <meta name="author" content="Jobossy Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="How to Use Jobossy" />
                <meta property="og:description" content="Step-by-step guide to using Jobossy to simplify your job search." />
                <meta property="og:image" content="https://jobossy.xyz/images/how-to-use-hero.png" />
                <meta property="og:url" content="https://jobossy.xyz/how-to-use" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="How to Use Jobossy" />
                <meta name="twitter:description" content="Learn how to use Jobossy to simplify your job search." />
                <meta name="twitter:image" content="https://jobossy.xyz/images/how-to-use-hero.png" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Use Jobossy",
                        "description": "Step-by-step guide on how to use Jobossy to automate your job search.",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": "Install Extension",
                                "text": "Download the Jobossy extension from the Chrome Web Store.",
                                "url": "https://chromewebstore.google.com/detail/jobossy/ikbklofpkopbljohhajgiohhkpcdfege"
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Create an Account",
                                "text": "Sign up or log in to your Jobossy account."
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Browse Jobs",
                                "text": "Visit job boards and let Jobossy detect job details automatically."
                            },
                            {
                                "@type": "HowToStep",
                                "name": "Track Applications",
                                "text": "Organize and track your job applications on your personalized dashboard."
                            }
                        ]
                    })}
                </script>

                {/* Canonical URL */}
                <link rel="canonical" href="https://jobossy.xyz/how-to-use" />
            </head>

            <NavigationBar />

            <main className="px-6 py-12 max-w-6xl mx-auto space-y-16">
                {/* Getting Started */}
                <section>
                    <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                        Getting Started
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Steps */}
                        {[
                            {
                                icon: <FaDownload />,
                                title: "Install Extension",
                                description: (
                                    <>
                                        Download the Jobossy extension from{" "}
                                        <a
                                            href="https://chromewebstore.google.com/detail/jobossy/ikbklofpkopbljohhajgiohhkpcdfege"
                                            className="text-yellow-400 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Jobossy Chrome Web Store"
                                        >
                                            Chrome Web Store
                                        </a>.
                                    </>
                                ),
                                color: "text-orange-400"
                            },
                            {
                                icon: <FaUserPlus />,
                                title: "Create an Account",
                                description: "Log in to your account or create a new account to get started.",
                                color: "text-pink-400"
                            },
                            {
                                icon: <FaSearch />,
                                title: "Browse Jobs",
                                description:
                                    "Visit a job board like LinkedIn, and our extension will detect job details for you.",
                                color: "text-blue-400"
                            },
                            {
                                icon: <FaChartLine />,
                                title: "Track Applications",
                                description: (
                                    <>
                                        Track your applications and gain insights into your job search journey by
                                        visiting{" "}
                                        <a
                                            href="https://www.jobossy.xyz"
                                            className="text-yellow-400 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Jobossy Dashboard"
                                        >
                                            your dashboard here
                                        </a>.
                                    </>
                                ),
                                color: "text-green-400"
                            }
                        ].map((step, index) => (
                            <article
                                key={index}
                                className="flex items-center gap-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
                            >
                                <div className={`text-5xl ${step.color}`}>{step.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-teal-400">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center mt-12">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6">
                        Ready to Simplify Your Job Search?
                    </h2>
                    <a
                        href="https://chromewebstore.google.com/detail/jobossy/ikbklofpkopbljohhajgiohhkpcdfege"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Install Jobossy Extension"
                    >
                        <button className="px-8 py-3 font-semibold text-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
                            Install Jobossy Now
                        </button>
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HowToUse;
