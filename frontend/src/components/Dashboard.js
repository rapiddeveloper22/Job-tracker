import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve email from localStorage
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    console.log(userEmail + " " + authToken);

    if (!authToken) {
        alert("User email not found. Please log in.");
        navigate('/login');
        // return;
    }

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('https://job-tracker-production-e381.up.railway.app/api/app/getAll', {
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
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Your Applications</h2>
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
