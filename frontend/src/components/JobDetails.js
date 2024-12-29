import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'; // Collapse icons

const JobDetails = ({ application }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // For collapsing the section

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <motion.div
            className={`rounded-xl shadow-xl p-8 mb-12 transform transition-all ${isCollapsed
                ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-900 to-gray-900'
                }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 15px 20px rgba(0, 0, 0, 0.2)', // Deeper shadow for more 3D effect
                transform: isCollapsed ? 'scale(0.95)' : 'scale(1)',
            }}
        >
            {/* Header with Collapse Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold text-blue-300 tracking-wide">
                    Job Details
                </h2>
                <motion.button
                    onClick={toggleCollapse}
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
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: isCollapsed ? 0 : 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
            >
                {!isCollapsed && (
                    <div className="space-y-4 text-lg text-gray-300">
                        <p><span className="font-semibold">Role:</span> {application?.role_name || 'N/A'}</p>
                        <p><span className="font-semibold">Company:</span> {application?.company || 'N/A'}</p>
                        <p><span className="font-semibold">Date Applied:</span> {application?.current_date || 'N/A'}</p>
                        <p><span className="font-semibold">Tags:</span>{application?.tags && application?.tags.length > 0 ? application.tags.join(', ') : ' None'}
                        </p>
                        <p><span className="font-semibold">Notes:</span> {application?.notes || 'No notes added'}</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default JobDetails;
