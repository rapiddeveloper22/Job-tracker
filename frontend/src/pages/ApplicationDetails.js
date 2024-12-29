import React from 'react';
import { useLocation } from 'react-router-dom';
import JobDetails from '../components/JobDetails';
import LinkedInProfiles from '../components/LinkedInProfiles';
import ResumeUpload from '../components/ResumeUpload';

const ApplicationDetails = () => {
    const location = useLocation();
    const { application } = location.state || {};

    console.log(application);

    const query = application
        ? `${application.role_name} at ${application.company}`
        : '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-800">
            <div className="max-w-screen-xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-5xl font-extrabold text-white">{application?.company || 'Job Application Details'}</h1>
                    <p className="text-xl font-medium text-gray-300">{application?.role_name || 'Role Name'}</p>
                </div>

                {/* Job Details Section - Refactored */}
                <JobDetails application={application} />

                {/* LinkedIn Matches Section */}
                <LinkedInProfiles appId={application?._id} query={query} />

                {/* Resume Upload Section */}
                <ResumeUpload jobLink={application?.job_link} />
            </div>
        </div>
    );
};

export default ApplicationDetails;
