import React, { useEffect, useRef } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ApplicationTable = ({ applications, onSort, sortBy, sortOrder, onPageLoad }) => {
    const observer = useRef();

    // console.log("Applications received:", applications); // Debug to check data

    // Infinite scroll logic using IntersectionObserver
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
        // Ensure page starts at the top
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-md">
            <table className="min-w-full bg-gray-700 table-auto border-separate border-spacing-0">
                {/* Table Header */}
                <thead className="text-gray-300">
                    <tr className="bg-gray-800 border-b-2 border-gray-600">
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
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-gray-100">
                    {Array.isArray(applications) && applications.length > 0 ? (
                        applications.map((app, index) => {
                            const isLastRow = index === applications.length - 1;
                            return (
                                <tr
                                    key={`${app._id}-${index}`}
                                    ref={isLastRow ? lastRowRef : null}
                                    className="hover:bg-gray-600 transition duration-300 ease-in-out"
                                >
                                    <td className="p-4">{app.company}</td>
                                    <td className="p-4">{app.role_name}</td>
                                    <td className="p-4">{app.current_date}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-4 text-center text-gray-300">
                                No applications available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationTable;
