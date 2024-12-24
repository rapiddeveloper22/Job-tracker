import React from 'react';
import { FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
    return (
        <div className="relative w-full sm:w-2/3 md:w-1/2 mb-4">
            <input
                type="text"
                placeholder="Search by company, role, or date (dd-mm-yyyy)"
                value={searchQuery}
                onChange={onSearchChange}
                className="w-full p-4 pr-10 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0088] text-lg"
            />
            {searchQuery && (
                <button
                    onClick={onClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ff0088] text-2xl hover:text-white transition duration-200 ease-in-out"
                    title="Clear search"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
