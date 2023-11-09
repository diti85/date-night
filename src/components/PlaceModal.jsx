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
  onDeletePlace,
}) => {
  const [editedPlace, setEditedPlace] = useState({ ...placeData });
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdatePlace = () => {
    onUpdatePlace(editedPlace);
    toggleEditing();
  };

  const handleDeletePlace = () => {
    onDeletePlace(placeData); // Pass the original placeData for deletion
    onClose(); // Close the modal after deletion
  };

  useEffect(() => {
    setEditedPlace({ ...placeData });
  }, [placeData]);

  useEffect(() => {
    console.log('availableCategories:', availableCategories);
console.log('editedPlace.se lectedCategories:', editedPlace.selectedCategories);
console.log('placeData.selectedCategories:', placeData.selectedCategories);
  }, []);
  const handleInputChange = (field, value) => {
    setEditedPlace((prevPlace) => ({ ...prevPlace, [field]: value }));
  };

  const toggleCategory = (categoryId) => {
    if (isEditing) {
      // Editing mode: select/deselect categories
      const isSelected = editedPlace.selectedCategories
        .map((selectedCategory) => selectedCategory._id)
        .includes(categoryId);
      const updatedCategories = isSelected
        ? editedPlace.selectedCategories.filter(
            (selectedCategory) => selectedCategory._id !== categoryId
          )
        : [
            ...editedPlace.selectedCategories,
            availableCategories.find((category) => category._id === categoryId),
          ];
  
      handleInputChange('selectedCategories', updatedCategories);
    } else {
      // Toggle editing mode
      setIsEditing(!isEditing);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-screen"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-screen bg-gray-800 bg-opacity-50"
          >
            <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2 md:p-8 shadow-lg relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
              <button
                onClick={onClose}
                className="absolute font-bold top-2 right-5 text-red-500 hover:text-gray-700"
              >
                Close
              </button>
              <h2
                onClick={!isEditing ? toggleEditing : undefined}
                className={`text-2xl font-semibold text-center mb-4 text-white cursor-pointer ${
                  isEditing ? 'border-b-2 border-blue-500' : ''
                }`}
              >
                {isEditing ? (
                  <div>
                    <label htmlFor="placeName" className="block text-gray-400 mb-1">
                      Place Name
                    </label>
                    <input
                      type="text"
                      id="placeName"
                      placeholder="Place Name"
                      value={editedPlace.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-2 border rounded-md mb-4 bg-gray-800 text-white text-center"
                    />
                  </div>
                ) : (
                  editedPlace.name
                )}
              </h2>
              <p
                onClick={!isEditing ? toggleEditing : undefined}
                className={`text-gray-400 mb-2 cursor-pointer ${
                  isEditing ? 'border-b-2 border-blue-500' : ''
                }`}
              >
                {isEditing ? (
                  <div>
                    <label htmlFor="location" className="block text-gray-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Location"
                      value={editedPlace.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-2 border rounded-md mb-4 bg-gray-800 text-white text-center"
                    />
                  </div>
                ) : (
                  editedPlace.location
                )}
              </p>
              <div
                onClick={!isEditing ? toggleEditing : undefined}
                className={`flex items-center mb-2 cursor-pointer ${
                  isEditing ? 'border-b-2 border-blue-500' : ''
                }`}
              >
                <label htmlFor="rating" className="block text-gray-400 mb-1 mr-2">
                  Rating
                </label>
                {isEditing ? (
                  <Rating
                    name="rating-edit"
                    value={editedPlace.rating}
                    classes={{ iconFilled: 'text-yellow-400' }}
                    onChange={(e, newValue) =>
                      handleInputChange('rating', newValue)
                    }
                    precision={0.5}
                  />
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className={`h-4 w-4 ${
                        index < editedPlace.rating
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  ))
                )}
                <p className="text-yellow-400 font-semibold ml-2">
                  {isEditing ? null : editedPlace.rating.toFixed(1)}
                </p>
              </div>
              <p
                onClick={!isEditing ? toggleEditing : undefined}
                className={`text-gray-400 cursor-pointer ${
                  isEditing ? 'border-b-2 border-blue-500' : ''
                }`}
              >
                <label htmlFor="notes" className="block text-gray-400 mb-1">
                  Notes
                </label>
                {isEditing ? (
                  <textarea
                    placeholder="Notes for next time"
                    value={editedPlace.reviews}
                    onChange={(e) => handleInputChange('reviews', e.target.value)}
                    className="w-full p-2 border rounded-md mb-4 resize-none focus:outline-none focus:ring focus:ring-blue-500 bg-gray-800 text-white text-center"
                    rows="4"
                  />
                ) : (
                  editedPlace.reviews
                )}
              </p>
              {/* Categories */}
              <div className="flex flex-wrap justify-center mb-4">
                {availableCategories.map((category) => (
                  <button
                    key={category._id}
                    className={`m-1 px-4 py-2 rounded-md ${
                      (isEditing ? editedPlace.selectedCategories : placeData.selectedCategories)
                        .map((selectedCategory) => selectedCategory._id)
                        .includes(category._id)
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
                <div className="flex space-x-4">
                  <button
                    onClick={handleUpdatePlace}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleDeletePlace}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </Modal>
        );
      };

export default PlaceModal;