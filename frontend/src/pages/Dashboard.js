import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../apiConfig';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import ApplicationTable from '../components/ApplicationTable';
import GmailPopup from '../components/GmailPopup';
import { FiDownload } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import Footer from '../components/Footer';  // Import Footer component here

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
    const [isGmailConnected, setIsGmailConnected] = useState(false);

    useEffect(() => {
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

    // Export to Excel Function
    const exportToExcel = () => {
        if (!applications || applications.length === 0) {
            alert("No data available to export.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(
            applications.map((app) => ({
                Company: app.company,
                Role: app.role_name,
                Date: app.current_date,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

        XLSX.writeFile(workbook, "JobApplications.xlsx");
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const convertToDate = (dateStr) => {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                const [day, month, year] = parts;
                return `${year}-${month}-${day}`;
            }
            return null;
        };

        const isDate = /^(\d{2})-(\d{2})-(\d{4})$/.test(query);

        let filtered = applications.filter((app) =>
            app.company.toLowerCase().includes(query.toLowerCase()) ||
            app.role_name.toLowerCase().includes(query.toLowerCase())
        );

        if (isDate) {
            const formattedDate = convertToDate(query);
            if (formattedDate) {
                filtered = filtered.filter((app) => app.current_date === formattedDate);
            }
        }

        setFilteredApplications(filtered);
        setCurrentPage(1);
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
                return order === 'asc'
                    ? a.company.localeCompare(b.company)
                    : b.company.localeCompare(a.company);
            }
            return 0;
        });

        setFilteredApplications(sortedApps);
    };

    const loadMoreApplications = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const indexOfLastApp = currentPage * applicationsPerPage;
    const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
    const currentApps = filteredApplications.slice(indexOfFirstApp, indexOfLastApp);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-800 text-gray-100 font-sans pt-16 flex flex-col">
            <NavigationBar />
            <div className="flex-1 max-w-full mx-auto bg-gray-800 p-8 mt-8 rounded-3xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0088] to-[#ff8800]">
                        Your Applications
                    </h2>
                    <button
                        onClick={exportToExcel}
                        className="p-3 rounded-full bg-gray-700 hover:bg-[#ff0088] text-white shadow-md transition ease-in-out duration-300"
                        title="Export to Excel"
                    >
                        <FiDownload className="text-xl" />
                    </button>
                </div>

                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                    onClearSearch={() => setSearchQuery('')}
                />

                <ApplicationTable
                    applications={filteredApplications}
                    onSort={handleSort}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onPageLoad={loadMoreApplications}
                />

                <div>
                    {localStorage.getItem('isGmailConnected') == null ? (
                        <GmailPopup
                            isConnected={isGmailConnected}
                            onConnect={() => setIsGmailConnected(true)}
                        />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Dashboard;
