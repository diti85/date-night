import React, { useState } from 'react';
import Navbar from './Navbar';
import Place from './Place';
import AddNewPlaceModal from './AddNewPlaceModal';

const Places = () => {
  const [places, setPlaces] = useState([
    // Initialize the list of places here
    // Example: { name: 'Restaurant A', location: 'City A', category: 'Food', picture: 'url', rating: 4.5, reviews: [] }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddPlace = (newPlace) => {
    // Add a new place to the list
    setPlaces([...places, newPlace]);
  };

  const handleDeletePlace = (index) => {
    // Delete a place from the list
    const updatedPlaces = places.filter((place, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl text-red-500 font-semibold mb-4">Our Favorite Places</h1>
        <button onClick={handleModalOpen} className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600 mb-4">
          Add New Place
        </button>
        <AddNewPlaceModal isOpen={isModalOpen} onClose={handleModalClose} onSuccess={handleAddPlace} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place, index) => (
            <Place
              key={index}
              name={place.name}
              location={place.location}
              category={place.category}
              picture={place.picture}
              rating={place.rating}
              reviews={place.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Places;
