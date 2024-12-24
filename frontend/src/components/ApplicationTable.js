import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaTags } from 'react-icons/fa';
import { FiDownload, FiEdit } from 'react-icons/fi';
import * as XLSX from 'xlsx';

const ApplicationTable = ({ applications, onSort, sortBy, sortOrder, onPageLoad, updateApplication }) => {
    const observer = useRef();
    const [selectedApp, setSelectedApp] = useState(null);
    const [notesPopupVisible, setNotesPopupVisible] = useState(false);
    const [tagsPopupVisible, setTagsPopupVisible] = useState(false);
    const [viewFullNotePopup, setViewFullNotePopup] = useState(false);
    const [notesInput, setNotesInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [fullNote, setFullNote] = useState('');

    const lastRowRef = (node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onPageLoad(); // Load more data
            }
        });
        if (node) observer.current.observe(node);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure page starts at the top
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

    return (
        <div className="relative pb-10">
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
                        </tr>
                    </thead>

                    <tbody className="text-gray-100">
                        {Array.isArray(applications) && applications.length > 0 ? (
                            applications.map((app, index) => {
                                const isLastRow = index === applications.length - 1;
                                return (
                                    <tr
                                        key={`${app._id}-${index}`}
                                        ref={isLastRow ? lastRowRef : null}
                                        className="hover:bg-gray-700 transition duration-300 ease-in-out"
                                    >
                                        <td className="p-4">{app.company}</td>
                                        <td className="p-4">{app.role_name}</td>
                                        <td className="p-4">{app.current_date}</td>
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
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-300">
                                    No applications available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Notes Popup */}
            {notesPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center animate-fade-in">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-lg">
                        <h3 className="text-lg font-bold text-gray-200 mb-4">Edit Notes</h3>
                        <textarea
                            value={notesInput}
                            onChange={(e) => setNotesInput(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            placeholder="Add or edit your notes here..."
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
            )}

            {/* View Full Note Popup */}
            {viewFullNotePopup && (
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
            )}

            {/* Tags Popup */}
            {tagsPopupVisible && (
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
            )}
        </div>
    );
};

export default ApplicationTable;
