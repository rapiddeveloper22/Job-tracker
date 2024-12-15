import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../apiConfig';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const userEmail = localStorage.getItem('userEmail');
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    if (!authToken) {
        alert("User not authenticated. Please log in.");
        navigate('/login');
    }

    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [applicationsPerPage] = useState(10);
    const lastApplicationElementRef = useRef();

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
                    setFilteredApplications(data);
                } else {
                    alert(data.message || 'Failed to fetch applications');
                }
            } catch (err) {
                console.error('Error fetching applications:', err);
            }
        };

        fetchApplications();
    }, [userEmail, authToken]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Function to validate and convert the date format (dd-mm-yyyy to yyyy-mm-dd)
        const convertToDate = (dateStr) => {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                // Date is in dd-mm-yyyy format
                const day = parts[0];
                const month = parts[1];
                const year = parts[2];
                return `${year}-${month}-${day}`; // Convert to yyyy-mm-dd
            }
            return null;
        };

        // Check if the query is a valid date in dd-mm-yyyy format
        const isDate = /^(\d{2})-(\d{2})-(\d{4})$/.test(query); // Match dd-mm-yyyy format

        let filtered = applications.filter((app) =>
            app.company.toLowerCase().includes(query.toLowerCase()) ||
            app.role_name.toLowerCase().includes(query.toLowerCase())
        );

        if (isDate) {
            const formattedDate = convertToDate(query);
            if (formattedDate) {
                // Filter by date if it's a valid date
                filtered = filtered.filter((app) =>
                    app.current_date === formattedDate // Compare formatted date
                );
            }
        }

        setFilteredApplications(filtered);
        setCurrentPage(1); // Reset to the first page when search query changes
    };

    const handleSort = (field) => {
        const order = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortOrder(order);

        const sortedApps = [...filteredApplications].sort((a, b) => {
            if (field === 'date') {
                const dateA = new Date(a.current_date);
                const dateB = new Date(b.current_date);
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (field === 'company') {
                const companyA = a.company.toLowerCase();
                const companyB = b.company.toLowerCase();
                return order === 'asc' ? companyA.localeCompare(companyB) : companyB.localeCompare(companyA);
            }
            return 0;
        });

        setFilteredApplications(sortedApps);
    };

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (lastApplicationElementRef.current) {
                const bottom = lastApplicationElementRef.current.getBoundingClientRect().bottom;
                if (bottom <= window.innerHeight) {
                    setCurrentPage((prev) => prev + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const indexOfLastApp = currentPage * applicationsPerPage;
    const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
    const currentApps = filteredApplications.slice(indexOfFirstApp, indexOfLastApp);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-800 text-gray-100 font-sans py-8 px-6">
            <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-3xl shadow-xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0088] to-[#ff8800]">
                        Your Applications
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="py-2 px-6 rounded-lg bg-gradient-to-r from-[#ff0088] to-[#ff8800] text-white font-medium hover:opacity-90 transition ease-in-out duration-300"
                    >
                        Logout
                    </button>
                </div>

                {/* Search Section */}
                <div className="flex items-center justify-between mb-6">
                    <div className="relative w-full sm:w-2/3 md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search by company, role, or date (dd-mm-yyyy)"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0088] text-lg"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ff0088] text-xl"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full bg-gray-700 rounded-lg shadow-md">
                    <table className="min-w-full bg-gray-700 table-auto border-separate border-spacing-0">
                        <thead className="text-gray-300">
                            <tr className="bg-gray-800 border-b-2 border-gray-600">
                                <th
                                    onClick={() => handleSort('company')}
                                    className="p-4 text-left cursor-pointer hover:text-[#ff0088] relative"
                                >
                                    Company
                                    {sortBy === 'company' && (
                                        <span className="inline-block ml-2">
                                            {sortOrder === 'asc' ? (
                                                <FaArrowUp className="text-[#ff0088]" />
                                            ) : (
                                                <FaArrowDown className="text-[#ff0088]" />
                                            )}
                                        </span>
                                    )}
                                </th>
                                <th
                                    onClick={() => handleSort('role_name')}
                                    className="p-4 text-left cursor-pointer hover:text-[#ff0088] relative"
                                >
                                    Role
                                    {sortBy === 'role_name' && (
                                        <span className="inline-block ml-2">
                                            {sortOrder === 'asc' ? (
                                                <FaArrowUp className="text-[#ff0088]" />
                                            ) : (
                                                <FaArrowDown className="text-[#ff0088]" />
                                            )}
                                        </span>
                                    )}
                                </th>
                                <th
                                    onClick={() => handleSort('date')}
                                    className="p-4 text-left cursor-pointer hover:text-[#ff0088] relative"
                                >
                                    Date
                                    {sortBy === 'date' && (
                                        <span className="inline-block ml-2">
                                            {sortOrder === 'asc' ? (
                                                <FaArrowUp className="text-[#ff0088]" />
                                            ) : (
                                                <FaArrowDown className="text-[#ff0088]" />
                                            )}
                                        </span>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-100">
                            {currentApps.map((app, index) => (
                                <tr key={`${app._id}-${index}`} ref={index === currentApps.length - 1 ? lastApplicationElementRef : null} className={`hover:bg-gray-600 transition ease-in-out duration-300 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}>
                                    <td className="p-4">{app.company}</td>
                                    <td className="p-4">{app.role_name}</td>
                                    <td className="p-4">{app.current_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
