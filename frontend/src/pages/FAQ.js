import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faEnvelope, faTrashAlt, faLock, faSyncAlt, faGlobe, faShieldAlt, faSmile } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const FAQ = () => {
    const faqs = [
        {
            question: "What is Automatic Job Tracker?",
            answer: "Automatic Job Tracker simplifies your job application process. It helps you track applications and even auto-applies to jobs to save your time and effort.",
            icon: faQuestionCircle,
            color: "text-teal-500",
        },
        {
            question: "How does the application track my job applications?",
            answer: "Our app uses a browser extension for desktop tracking and Gmail integration for mobile, ensuring complete coverage of your applications.",
            icon: faGlobe,
            color: "text-blue-500",
        },
        {
            question: "Why do you need Gmail access?",
            answer: "We use Gmail to identify job-related emails and log applications when you apply via mobile. This ensures seamless tracking without additional effort from your side.",
            icon: faEnvelope,
            color: "text-yellow-500",
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely! We use advanced encryption, OAuth authentication, and follow strict data privacy standards to keep your information safe.",
            icon: faShieldAlt,
            color: "text-red-500",
        },
        {
            question: "Can I delete my data?",
            answer: "Yes, you’re in control. You can delete your data anytime through the app or by contacting our support team.",
            icon: faTrashAlt,
            color: "text-purple-500",
        },
        {
            question: "What if I uninstall the browser extension?",
            answer: "Uninstalling stops browser-based tracking. Gmail-based tracking can be stopped by revoking access from your Google account.",
            icon: faSyncAlt,
            color: "text-green-500",
        },
        {
            question: "How can I contact support?",
            answer: "Our support team is always here for you. Email us at autojobtracker@gmail.com or use the help section in the app for guides.",
            icon: faSmile,
            color: "text-pink-500",
        },
    ];

    return (
        <div className="bg-gradient-to-br from-indigo-900 via-black to-indigo-800 text-gray-300 min-h-screen flex flex-col">
            <NavigationBar />
            <div className="flex-1 container mx-auto px-8 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f6d] to-[#ffc3a0]">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-center mb-12 text-gray-300 leading-relaxed">
                        Got questions? We’ve got answers! If you still have any concerns, feel free to reach out to us anytime—we’re here to help.
                    </p>
                </motion.div>
                <div className="space-y-12">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className={`flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full shadow-md ${faq.color} mr-6`}>
                                <FontAwesomeIcon icon={faq.icon} className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-100">
                                    {faq.question}
                                </h2>
                                <p className="text-lg mt-2 text-gray-300 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
