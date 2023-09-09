import React from 'react';

const Place = ({ name, location, selectedCategories, rating, reviews }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-semibold text-white mb-2">{name}</h2>
      <p className="text-gray-400 mb-2">{location}</p>
      <p className="text-gray-400 mb-2">Categories: {selectedCategories.join(', ')}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 mr-2">
          {/* Display a star icon or a rating value */}
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${
                index < rating ? 'text-yellow-400' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          ))}
        </span>
        <p className="text-yellow-400 font-semibold">{rating.toFixed(1)}</p>
      </div>
      <p className="text-gray-400">{reviews}</p>
    </div>
  );
};

export default Place;
