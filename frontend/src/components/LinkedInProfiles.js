import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import { FaLinkedin } from 'react-icons/fa';
import { AiOutlineLoading3Quarters, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'; // Icons
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Collapse icons
import API_CONFIG from '../apiConfig';

const LinkedInProfiles = ({ appId, query }) => {
    const [linkedinProfiles, setLinkedinProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // For collapsing the section

    useEffect(() => {
        if (appId && query) {
            fetchLinkedInProfiles(query);
        }
    }, [appId, query]);

    const fetchLinkedInProfiles = async (searchQuery) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.SCRAPE.LINKEDINSCRAPE}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: searchQuery }),
            });

            const data = await response.json();
            setLinkedinProfiles(data.profiles || []);
        } catch (error) {
            console.error('Error scraping LinkedIn profiles:', error);
            setLinkedinProfiles([]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
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
            {/* Header with Collapse Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold text-blue-300 tracking-wide">
                    Connect with Insiders
                </h2>
                <motion.button
                    onClick={toggleCollapse}
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

            {/* Collapsible Content */}
            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center my-8">
                            <motion.div
                                className="h-16 w-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                        </div>
                    ) : linkedinProfiles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {linkedinProfiles.map((profile, index) => (
                                <motion.a
                                    key={index}
                                    href={profile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <div className="h-12 w-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
                                            <p className="text-gray-300">{profile.job}</p>
                                            <FaLinkedin className="text-[#0A66C2] text-3xl mt-4" />
                                        </>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">No LinkedIn profiles found.</p>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default LinkedInProfiles;
