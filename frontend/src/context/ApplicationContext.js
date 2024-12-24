import React, { createContext, useContext, useState, useEffect } from 'react';
import API_CONFIG from '../apiConfig';

// Create the context
const ApplicationContext = createContext();

// Custom hook to use the context
export const useApplications = () => {
    return useContext(ApplicationContext);
};

// Context Provider Component
export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);

    const authToken = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');

    // Fetch applications from the server
    const fetchApplications = async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.APPLICATION.GET_ALL}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_email: userEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                setApplications(data);
            } else {
                console.error('Failed to fetch applications:', data.message);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    // Update application on the server and locally
    const updateApplication = async (id, updatedFields) => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/app/updateApplication`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, userEmail, ...updatedFields }),
            });

            const data = await response.json();
            if (response.ok) {
                // Update the local state
                setApplications((prev) =>
                    prev.map((app) =>
                        app._id === id ? { ...app, ...updatedFields } : app
                    )
                );
            } else {
                console.error('Failed to update application:', data.message);
            }
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };

    // Initial fetch of applications when the context is mounted
    useEffect(() => {
        if (authToken && userEmail) {
            fetchApplications();
        }
    }, [authToken, userEmail]);

    return (
        <ApplicationContext.Provider
            value={{ applications, fetchApplications, updateApplication }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};
