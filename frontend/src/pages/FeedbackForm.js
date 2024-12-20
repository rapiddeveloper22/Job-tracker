import React, { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar'; // Make sure you have the correct path
import { useForm, ValidationError } from "@formspree/react";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedback: "",
    });
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup
    const [state, handleSubmit] = useForm("mbljnezw"); // Formspree form ID

    // Handling form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handling form submission
    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    // Trigger the popup state change when the form is successfully submitted
    useEffect(() => {
        if (state.succeeded) {
            setShowPopup(true);
            setFormData({ name: "", email: "", feedback: "" }); // Reset form after submission
        }
    }, [state.succeeded]); // Dependency on submission success state

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-800 text-gray-100">
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Main content section */}
            <div className="flex justify-center pt-24">
                {/* Form Container */}
                <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0088] to-[#ff8800] mb-6 text-center">
                        We Value Your Feedback!
                    </h2>
                    <form onSubmit={handleSubmitForm} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mt-1 p-4 bg-gray-700 text-gray-100 rounded-xl border border-gray-600 focus:ring-2 focus:ring-[#ff0088] outline-none"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1 p-4 bg-gray-700 text-gray-100 rounded-xl border border-gray-600 focus:ring-2 focus:ring-[#ff0088] outline-none"
                                placeholder="Your Email"
                                required
                            />
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                            />
                        </div>

                        {/* Feedback */}
                        <div>
                            <label htmlFor="feedback" className="block text-sm font-semibold text-gray-300">
                                Feedback
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                className="w-full mt-1 p-4 bg-gray-700 text-gray-100 rounded-xl border border-gray-600 focus:ring-2 focus:ring-[#ff0088] outline-none"
                                placeholder="Write your feedback here..."
                                rows="5"
                                required
                            ></textarea>
                            <ValidationError
                                prefix="Feedback"
                                field="feedback"
                                errors={state.errors}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full p-4 rounded-full bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-white text-lg font-semibold shadow-lg hover:opacity-90 transition ease-in-out duration-300"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            {/* Popup for submission success */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl text-center text-white max-w-sm">
                        <h3 className="text-2xl font-bold mb-4">Thank you for your feedback!</h3>
                        <p>Your response has been submitted successfully.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff0088] to-[#ff8800] rounded-full text-white"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackForm;
