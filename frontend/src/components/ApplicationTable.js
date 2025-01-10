import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaTags, FaPlus, FaMinus } from 'react-icons/fa';
import { FiDownload, FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import API_CONFIG from '../apiConfig';
import ConfirmationPopup from './ConfirmationComponent';

const ApplicationTable = ({ applications, onSort, sortBy, sortOrder, onPageLoad, updateApplication, onDeleteApplication }) => {
    const userEmail = localStorage.getItem('userEmail');
    const authToken = localStorage.getItem('authToken');

    const navigate = useNavigate();
    const observer = useRef();
    const [selectedApp, setSelectedApp] = useState(null);
    const [notesPopupVisible, setNotesPopupVisible] = useState(false);
    const [tagsPopupVisible, setTagsPopupVisible] = useState(false);
    const [viewFullNotePopup, setViewFullNotePopup] = useState(false);
    const [notesInput, setNotesInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [fullNote, setFullNote] = useState('');
    const [expandedRows, setExpandedRows] = useState({});
    const [linkedinProfiles, setLinkedinProfiles] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [loading, setLoading] = useState(false);

    const lastRowRef = (node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onPageLoad();
            }
        });
        if (node) observer.current.observe(node);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleNotesSave = () => {
        updateApplication(selectedApp._id, { notes: notesInput });
        setNotesPopupVisible(false);
        setSelectedApp(null);
    };

    const handleTagsSave = () => {
        updateApplication(selectedApp._id, { tags: tagsInput.split(',').map((tag) => tag.trim()) });
        setTagsPopupVisible(false);
        setSelectedApp(null);
    };

    const handleDeleteClick = (appId) => {
        setSelectedAppId(appId);
        setIsPopupOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAppId) {
            deleteApplication(selectedAppId);
            setIsPopupOpen(false);
            setSelectedAppId(null);
        }
    };

    const deleteApplication = async (appId) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.APPLICATION.DELETE}/${appId}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete application');
            }

            // Update the UI by filtering out the deleted application
            // setApplications((prevApps) => prevApps.filter((app) => app._id !== appId));
            onDeleteApplication(appId);
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Failed to delete application. Please try again.');
        } finally {
            setLoading(false);
            setIsPopupOpen(false);
            setSelectedAppId(null);
        }
    };

    const handleRowClick = (app) => {
        navigate(`/application/${app._id}`, { state: { application: app } });
    };

    const toggleExpandRow = (appId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [appId]: !prev[appId],
        }));

        if (!expandedRows[appId]) {
            searchLinkedInProfiles(appId);
        }
    };

    const searchLinkedInProfiles = async (appId) => {
        const app = applications.find((app) => app._id === appId);
        if (app) {
            const query = `${app.role_name} at ${app.company}`;
            setIsLoading(true); // Show loader
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.SCRAPE.LINKEDINSCRAPE}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                const data = await response.json();

                if (data.profiles) {
                    setLinkedinProfiles((prev) => ({
                        ...prev,
                        [appId]: data.profiles,
                    }));
                } else {
                    setLinkedinProfiles((prev) => ({
                        ...prev,
                        [appId]: [],
                    }));
                }
            } catch (error) {
                console.error('Error scraping LinkedIn profiles:', error);
                setLinkedinProfiles((prev) => ({
                    ...prev,
                    [appId]: [],
                }));
            } finally {
                setIsLoading(false); // Hide loader
            }
        }
    };

    return (
        <div className="relative pb-10">
            {/* Loader */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            )}

            {/* Table */}
            <div className={`overflow-x-auto bg-gray-800 rounded-lg shadow-lg ${notesPopupVisible || viewFullNotePopup ? 'blur-sm' : ''}`}>
                <table className="min-w-full bg-gray-800 table-auto border-separate border-spacing-0">
                    <thead className="text-gray-300">
                        <tr className="bg-gray-900 border-b-2 border-gray-700">
                            <th
                                onClick={() => onSort('company')}
                                className="p-4 text-left cursor-pointer hover:text-[#ff0088]"
                            >
                                Company
                                {sortBy === 'company' && (
                                    <span className="ml-2">
                                        {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                                    </span>
                                )}
                            </th>
                            <th className="p-4 text-left">Role</th>
                            <th
                                onClick={() => onSort('date')}
                                className="p-4 text-left cursor-pointer hover:text-[#ff0088]"
                            >
                                Date
                                {sortBy === 'date' && (
                                    <span className="ml-2">
                                        {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                                    </span>
                                )}
                            </th>
                            <th className="p-4 text-left">Tags</th>
                            <th className="p-4 text-left">Notes</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-100">
                        {Array.isArray(applications) && applications.length > 0 ? (
                            applications.map((app, index) => {
                                const isLastRow = index === applications.length - 1;
                                const isExpanded = expandedRows[app._id];
                                const profiles = linkedinProfiles[app._id] || [];
                                return (
                                    <React.Fragment key={`${app._id}-${index}`}>
                                        <tr
                                            ref={isLastRow ? lastRowRef : null}
                                            key={app._id}
                                            className="hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer"
                                        // onClick={() => handleRowClick(app)}
                                        >
                                            <td className="p-4" onClick={() => handleRowClick(app)}>{app.company}</td>
                                            <td className="p-4" onClick={() => handleRowClick(app)}>{app.role_name}</td>
                                            <td className="p-4" onClick={() => handleRowClick(app)}>{app.current_date}</td>
                                            <td className="p-4 flex items-center">
                                                {app.tags && app.tags.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {app.tags.map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2 py-1 bg-blue-600 text-white text-sm rounded-full cursor-pointer hover:bg-blue-500"
                                                                onClick={() => {
                                                                    setSelectedApp(app);
                                                                    setTagsInput(app.tags.join(', '));
                                                                    setTagsPopupVisible(true);
                                                                }}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="text-sm text-blue-400 hover:underline flex items-center"
                                                        onClick={() => {
                                                            setSelectedApp(app);
                                                            setTagsPopupVisible(true);
                                                        }}
                                                    >
                                                        <FaTags className="inline-block mr-2 text-lg" />
                                                        Add Tags
                                                    </button>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {app.notes ? (
                                                    <div>
                                                        <span
                                                            className="text-gray-300 cursor-pointer hover:text-blue-400"
                                                            onClick={() => {
                                                                setFullNote(app.notes);
                                                                setViewFullNotePopup(true);
                                                            }}
                                                        >
                                                            {app.notes.length > 30
                                                                ? `${app.notes.substring(0, 30)}...`
                                                                : app.notes}
                                                        </span>
                                                        <button
                                                            className="ml-2 text-blue-400 hover:underline"
                                                            onClick={() => {
                                                                setSelectedApp(app);
                                                                setNotesInput(app.notes || '');
                                                                setNotesPopupVisible(true);
                                                            }}
                                                        >
                                                            <FiEdit className="inline-block text-lg" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="text-sm text-blue-400 hover:underline"
                                                        onClick={() => {
                                                            setSelectedApp(app);
                                                            setNotesInput('');
                                                            setNotesPopupVisible(true);
                                                        }}
                                                    >
                                                        Add Notes
                                                    </button>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => handleDeleteClick(app._id)}
                                                    className="text-red-500 hover:bg-red-700 hover:text-white p-2 rounded-md"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>

                                        {isExpanded && profiles.length > 0 && (
                                            <tr className="bg-gray-700">
                                                <td colSpan="6" className="p-4">
                                                    <div className="transition-all duration-300 ease-in-out">
                                                        <p className="mb-4 text-gray-300">
                                                            LinkedIn Profiles for {app.role_name} at {app.company}:
                                                        </p>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            {profiles.map((profile, index) => (
                                                                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                                                    <a
                                                                        href={profile.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-400 hover:underline"
                                                                    >
                                                                        <p className="font-semibold">{profile.name}</p>
                                                                        <p>{profile.job}</p>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-300">
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* </div> */}


            {/* Confirmation Popup */}
            <ConfirmationPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this application?"
            />



            {/* View Full Note Popup */}
            {
                viewFullNotePopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center animate-fade-in">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-lg">
                            <h3 className="text-lg font-bold text-gray-200 mb-4">Full Note</h3>
                            <textarea
                                value={fullNote}
                                onChange={(e) => setFullNote(e.target.value)}
                                className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="6"
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setViewFullNotePopup(false)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Tags Popup */}
            {
                tagsPopupVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center animate-fade-in">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-lg">
                            <h3 className="text-lg font-bold text-gray-200 mb-4">Edit Tags</h3>
                            <input
                                type="text"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Comma-separated tags"
                            />
                            <div className="flex justify-end mt-4 space-x-3">
                                <button
                                    onClick={() => setTagsPopupVisible(false)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleTagsSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Notes Popup */}
            {
                notesPopupVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center animate-fade-in">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-lg">
                            <h3 className="text-lg font-bold text-gray-200 mb-4">Add Notes</h3>
                            <textarea
                                value={notesInput}
                                onChange={(e) => setNotesInput(e.target.value)}
                                className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="6"
                            />
                            <div className="flex justify-end mt-4 space-x-3">
                                <button
                                    onClick={() => setNotesPopupVisible(false)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleNotesSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ApplicationTable;
