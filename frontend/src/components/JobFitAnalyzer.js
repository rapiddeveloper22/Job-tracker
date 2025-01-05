import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Animation library
import { AiOutlineLoading3Quarters, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'; // Icons
import API_CONFIG from '../apiConfig';

const JobFitAnalyzer = ({ jobLink }) => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [similarityScore, setSimilarityScore] = useState(null);
    const [scoreReason, setScoreReason] = useState('');
    const [isScraping, setIsScraping] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed
    const [referralMessage, setReferralMessage] = useState('');
    const [isCopying, setIsCopying] = useState(false);

    useEffect(() => {
        if (jobLink) {
            scrapeJobDescription(jobLink);
        }
    }, [jobLink]);

    const handleResumeChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(referralMessage).then(() => {
            setIsCopying(true);
            setTimeout(() => setIsCopying(false), 2000);
        });
    };

    const fetchReferralMessage = async (resume) => {
        try {
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('jobDescription', jobDescription);

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AI.GETREFERRALTEXT}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            const data = await response.json();
            if (data.referralMessage) {
                setReferralMessage(data.referralMessage);
            } else {
                console.error('Failed to generate referral message.');
            }
        } catch (error) {
            console.error('Error fetching referral message:', error);
        }
    };

    const scrapeJobDescription = async (link) => {
        setIsScraping(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.SCRAPE.JOBDESCRIPTION}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: link }),
            });

            const data = await response.json();
            if (data.jobDescription) {
                setJobDescription(data.jobDescription);
            } else {
                setErrorMessage('Failed to scrape the job description. Please paste it manually.');
            }
        } catch (error) {
            console.error('Error scraping job description:', error);
            setErrorMessage('Failed to scrape the job description. Please paste it manually.');
        } finally {
            setIsScraping(false);
        }
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleSubmit = async () => {
        if (!resume || !jobDescription.trim()) {
            alert('Please upload your resume and provide a job description.');
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jobDescription', jobDescription);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AI.GETSIMILARITYSCORE}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            const data = await response.json();

            if (data.similarityScore && data.scoreReason) {
                setSimilarityScore(data.similarityScore);
                setScoreReason(data.scoreReason);

                if (data.similarityScore >= 75) {
                    fetchReferralMessage(resume);
                }
            } else {
                alert('Failed to submit resume. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting resume:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatScoreReason = (text) => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('* **')) {
                const startIndex = line.indexOf('**') + 2;
                const endIndex = line.indexOf('**', startIndex);
                const boldHeading = line.slice(startIndex, endIndex);
                const remainingText = line.slice(endIndex + 2).trim();

                return (
                    <motion.li
                        key={index}
                        className="text-gray-300 list-disc ml-5 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span className="font-semibold text-blue-400">{boldHeading}</span>
                        {remainingText && ` ${remainingText}`}
                    </motion.li>
                );
            } else if (line.startsWith('**') && line.endsWith('**')) {
                return (
                    <strong key={index} className="text-blue-400 block mb-2">
                        {line.slice(2, -2)}
                    </strong>
                );
            } else if (line.startsWith('* ')) {
                return (
                    <li key={index} className="text-gray-300 list-disc ml-5 mb-2">
                        {line.slice(2)}
                    </li>
                );
            } else {
                return (
                    <p key={index} className="text-gray-300 mb-2">
                        {line}
                    </p>
                );
            }
        });
    };

    return (
        <motion.div
            className={`rounded-xl shadow-xl p-8 mb-12 transform transition-all ${isCollapsed
                ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-900 via-gray-800 to-black'
                }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold text-blue-300 tracking-wide">
                    Job Fit Analyzer
                </h2>

                <motion.button
                    onClick={() => {
                        setIsCollapsed(!isCollapsed);
                        if (!isCollapsed) {
                            setSimilarityScore(null); // Clear analysis when collapsed
                        }
                    }}
                    // className="text-white bg-indigo-600 rounded-full p-2 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
                    whileHover={{ scale: 1.5 }}
                >
                    {isCollapsed ? (
                        <AiFillCaretDown className="text-blue-300 text-2xl" />
                    ) : (
                        <AiFillCaretUp className="text-blue-300 text-2xl" />
                    )}
                </motion.button>
            </div>

            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="space-y-6 mt-6">
                        <div>
                            <label htmlFor="resume" className="block text-lg font-medium text-gray-300 mb-2">
                                Upload Resume:
                            </label>
                            <input
                                type="file"
                                id="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:file:ring focus:file:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="jobDescription" className="block text-lg font-medium text-gray-300 mb-2">
                                {jobLink ? 'Scraped Job Description:' : 'Paste Job Description:'}
                            </label>
                            {isScraping ? (
                                <motion.div
                                    className="text-gray-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    Scraping job description...
                                </motion.div>
                            ) : (
                                <textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    onChange={handleJobDescriptionChange}
                                    placeholder="Enter or edit the job description here..."
                                    rows="6"
                                    className="w-full p-3 text-gray-900 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            )}
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        </div>

                        <motion.button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-400 transition-transform transform ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                                }`}
                            whileHover={{ scale: 1.1 }}
                        >
                            {isSubmitting ? (
                                <AiOutlineLoading3Quarters className="animate-spin mx-auto text-lg" />
                            ) : (
                                'Submit'
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {!isCollapsed && similarityScore !== null && (
                <motion.div
                    className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">Score: {similarityScore}</h3>
                    <div className="text-white space-y-4">
                        <h4 className="text-xl font-semibold text-blue-200">Analysis:</h4>
                        <ul className="space-y-2">{formatScoreReason(scoreReason)}</ul>
                    </div>

                    {similarityScore >= 75 && referralMessage && (
                        <div className="mt-6 bg-gray-700 p-4 rounded-md">
                            <h4 className="text-lg font-semibold text-blue-300 mb-2">
                                Referral Message:
                            </h4>
                            <p className="text-white">{formatScoreReason(referralMessage)}</p>
                            <button
                                onClick={handleCopyReferral}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                {isCopying ? 'Copied!' : 'Copy Message'}
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default JobFitAnalyzer;
