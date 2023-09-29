import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Rating,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const PlaceModal = ({
  isOpen,
  onClose,
  placeData,
  availableCategories,
  onUpdatePlace,
}) => {
  const [name, setName] = useState(placeData.name);
  const [location, setLocation] = useState(placeData.location);
  const [firstTime, setFirstTime] = useState(placeData.firstTime);
  const [selectedCategories, setSelectedCategories] = useState(
    placeData.selectedCategories
  );
  const [rating, setRating] = useState(placeData.rating);
  const [reviews, setReviews] = useState(placeData.reviews);
  const [isEditing, setIsEditing] = useState(true);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdatePlace = () => {
    const updatedPlace = {
      ...placeData,
      name,
      location,
      firstTime,
      selectedCategories,
      rating,
      reviews,
    };
    onUpdatePlace(updatedPlace);
    toggleEditing();
  };

  useEffect(() => {
    console.log("Place data from placemodal", placeData)
    setName(placeData.name);
    setLocation(placeData.location);
    setFirstTime(placeData.firstTime);
    setSelectedCategories(placeData.selectedCategories);
    setRating(placeData.rating);
    setReviews(placeData.reviews);
    //consolelog all variables
    console.log("name", name, "location", location, "firstTime", firstTime, "selectedCategories", selectedCategories, "rating", rating, "reviews", reviews)
  }, [placeData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2 md:p-8 shadow-lg relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <button
          onClick={onClose}
          className="absolute font-bold top-2 right-5 text-red-500 hover:text-gray-700"
        >
          Close
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          {isEditing ? (
            <div>
              <label htmlFor="placeName" className="block text-gray-400 mb-1">
                Place Name
              </label>
              <input
                type="text"
                id="placeName"
                placeholder="Place Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-800 text-white text-center"
              />
            </div>
          ) : (
            name
          )}
        </h2>
        <p className="text-gray-400 mb-2">
          {isEditing ? (
            <div>
              <label htmlFor="location" className="block text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 bg-gray-800 text-white text-center"
              />
            </div>
          ) : (
            location
          )}
        </p>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`h-4 w-4 ${
                index < rating ? 'text-yellow-400' : 'text-gray-400'
              }`}
            />
          ))}
          <p className="text-yellow-400 font-semibold ml-2">
            {isEditing ? (
              <Rating
                name="rating"
                value={rating}
                classes={{ iconFilled: 'text-yellow-400' }}
                onChange={(e, newValue) => setRating(newValue)}
                precision={0.5}
              />
            ) : (
              rating.toFixed(1)
            )}
          </p>
        </div>
        <p className="text-gray-400">
          {isEditing ? (
            <textarea
              placeholder="Notes for next time"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 resize-none focus:outline-none focus:ring focus:ring-blue-500 bg-gray-800 text-white text-center"
              rows="4"
            />
          ) : (
            reviews
          )}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mb-4">
  {availableCategories.map((category) => (
    <button
      key={category._id}
      className={`m-1 px-4 py-2 rounded-md ${
        selectedCategories.includes(category._id)
          ? 'bg-blue-500 text-white'
          : 'bg-gray-800 text-white'
      }`}
      onClick={() => toggleCategory(category._id)}
    >
      {category.category}
    </button>
  ))}
</div>
        {isEditing ? (
          <button
            onClick={handleUpdatePlace}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        ) : null}
      </div>
    </Modal>
  );
};

export default PlaceModal;
