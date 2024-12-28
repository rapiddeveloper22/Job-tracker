import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import API_CONFIG from '../apiConfig';

const ApplicationDetails = () => {
    const location = useLocation();
    const { application } = location.state || {};
    const [linkedinProfiles, setLinkedinProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (application) {
            searchLinkedInProfiles(application._id);
        }
    }, [application]);

    const searchLinkedInProfiles = async (appId) => {
        if (!application) return;
        const query = `${application.role_name} at ${application.company}`;
        setIsLoading(true);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.SCRAPE.LINKEDINSCRAPE}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-800">
            <div className="max-w-screen-xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-5xl font-extrabold text-white">{application?.company || 'Job Application Details'}</h1>
                    <p className="text-xl font-medium text-gray-300">{application?.role_name || 'Role Name'}</p>
                </div>

                {/* Job Details Section */}
                <div className="bg-[#1a202c] rounded-xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-white mb-8">Job Details</h2>
                    <div className="space-y-4 text-lg text-gray-300">
                        <p><span className="font-semibold">Role:</span> {application?.role_name || 'N/A'}</p>
                        <p><span className="font-semibold">Company:</span> {application?.company || 'N/A'}</p>
                        <p><span className="font-semibold">Date Applied:</span> {application?.current_date || 'N/A'}</p>
                        <p><span className="font-semibold">Tags:</span> {application?.tags ? application.tags.join(', ') : 'None'}</p>
                        <p><span className="font-semibold">Notes:</span> {application?.notes || 'No notes added'}</p>
                    </div>
                </div>

                {/* LinkedIn Matches Section */}
                <div className="bg-[#1a202c] rounded-xl shadow-2xl p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-white mb-8">LinkedIn Matches</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="h-12 w-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : linkedinProfiles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {linkedinProfiles.map((profile, index) => (
                                <a
                                    key={index}
                                    href={profile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#2d3748] text-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                                    <p className="text-gray-200">{profile.job}</p>
                                    <FaLinkedin className="text-[#0A66C2] text-2xl mt-4" />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">No LinkedIn profiles found.</p>
                    )}
                </div>

                {/* Future Sections Placeholder */}
                <div className="bg-[#1a202c] rounded-xl shadow-2xl p-8">
                    <h2 className="text-3xl font-semibold text-white mb-8">Future Section</h2>
                    <p className="text-lg text-gray-300">This section can be used for additional details or features.</p>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetails;
