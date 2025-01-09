import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import JobDetails from '../components/JobDetails';
import LinkedInProfiles from '../components/LinkedInProfiles';
import JobFitAnalyzer from '../components/JobFitAnalyzer';

const ApplicationDetails = () => {
    const location = useLocation();
    const { application } = location.state || {};

    const query = application
        ? `${application.role_name} at ${application.company}`
        : '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-800">
            <NavigationBar />

            <main className="max-w-screen-xl mx-auto px-6 py-12">
                {/* Header Section */}
                <header className="text-center space-y-4 mb-12">
                    <h1 className="text-5xl font-extrabold text-white">
                        {application?.company || 'Job Application Details'}
                    </h1>
                    <p className="text-xl font-medium text-gray-300">
                        {application?.role_name || 'Role Name'}
                    </p>
                </header>

                {/* Job Details Section */}
                <section>
                    <JobDetails application={application} />
                </section>

                {/* LinkedIn Matches Section */}
                <section aria-labelledby="linkedin-profiles-title" className="mt-12">
                    <h2 id="linkedin-profiles-title" className="text-3xl font-bold text-white mb-6">
                        LinkedIn Profiles
                    </h2>
                    <LinkedInProfiles appId={application?._id} query={query} />
                </section>

                {/* Resume Upload Section */}
                <section aria-labelledby="job-fit-analyzer-title" className="mt-12">
                    <h2 id="job-fit-analyzer-title" className="text-3xl font-bold text-white mb-6">
                        Job Fit Analyzer
                    </h2>
                    <JobFitAnalyzer jobLink={application?.job_link} />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ApplicationDetails;
