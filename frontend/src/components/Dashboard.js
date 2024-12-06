import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../apiConfig';

const Dashboard = () => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve email from localStorage
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    console.log(userEmail + " " + authToken);

    // If authToken is not found, redirect to login page
    if (!authToken) {
        alert("User not authenticated. Please log in.");
        navigate('/login');
        // return;
    }

    const [applications, setApplications] = useState([]);

    // Fetch applications on component mount
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.APPLICATION.GET_ALL}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_email: userEmail }),
                });

                const data = await response.json();
                if (response.ok) {
                    setApplications(data);
                } else {
                    alert(data.message || 'Failed to fetch applications');
                }
            } catch (err) {
                console.error('Error fetching applications:', err);
            }
        };

        fetchApplications();
    }, [userEmail, authToken]);

    // Logout function
    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <h2>Your Applications</h2>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th>Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app._id}>
                            <td>{app.company}</td>
                            <td>{app.role_name}</td>
                            <td>{app.current_date}</td>
                            <td>{app.application_submitted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
