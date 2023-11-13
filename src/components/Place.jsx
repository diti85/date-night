import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Place = ({ name, location, selectedCategories, rating, reviews, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const handleClick = () => {
  //   // Add your click functionality here
  //   console.log('Place Card clicked');
  // };

  return (
    <div
      className={`bg-gray-800 p-4 rounded-lg shadow-lg mb-4 ${isHovered ? 'hover:shadow-xl cursor-pointer' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-white mb-2">{name}</h2>
      <p className="text-gray-400 mb-2">{location}</p>
      <p className="text-gray-400 mb-2 text-sm">
        Categories: {selectedCategories.map((category) => category.category).join(', ')}
      </p>
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`h-4 w-4 ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
          />
        ))}
        <p className="text-yellow-400 font-semibold ml-2 text-sm">{rating.toFixed(1)}</p>
      </div>
      <p className="text-gray-400 text-sm">{reviews}</p>
    </div>
  );
};

export default Place;
