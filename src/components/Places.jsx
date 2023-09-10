import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Place from './Place';
import AddNewPlaceModal from './AddNewPlaceModal';

const url = 'http://localhost:5000/api/places';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  //fetch places when page loads from database
  useEffect(() => {
    fetch('http://localhost:5000/api/places')
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE FROM DB", data);
        setPlaces(data);
        setFilteredPlaces(data);
      });
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddPlace = (newPlace) => {
    console.log("newPlace", newPlace);

    // Add a new place to the list and make a POST call to the database
    fetch('http://127.0.0.1:5000/api/places', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlace),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE FROM DB", data);
        setPlaces([...places, data]);
        setFilteredPlaces([...filteredPlaces, data]);
      });
  };

  const handleDeletePlace = (index) => {
    const updatedPlaces = places.filter((place, i) => i !== index);
    setPlaces(updatedPlaces);
    setFilteredPlaces(updatedPlaces);
  };
  const handleCategoryFilter = (category) => {
    // Filter places by selected category
    if (category === 'All') {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter((place) =>
        place.selectedCategories.includes(category)
      );
      setFilteredPlaces(filtered);
    }
    setSelectedCategories([category]);
  };

    // Group places by category
    const categorizedPlaces = places.reduce((acc, place) => {
      if (!acc[place.category]) {
        acc[place.category] = [];
      }
      acc[place.category].push(place);
      return acc;
    }, {});
    return (
      <div>
        <Navbar />
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center p-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-red-500 font-semibold mb-4">
              Our Favorite Places
            </h1>
            <button
              onClick={handleModalOpen}
              className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600 mb-4"
            >
              Add New Place
            </button>
          </div>
          <AddNewPlaceModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSuccess={handleAddPlace}
          />
          <div className="flex mb-4">
            <button
              onClick={() => handleCategoryFilter('All')}
              className={`${
                selectedCategories.includes('All')
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              } py-1 px-4 rounded-full text-lg mr-4`}
            >
              All
            </button>
            {/* Replace with your logic to display available categories */}
            {/* Example:
            <button
              onClick={() => handleCategoryFilter('Category1')}
              className={`${
                selectedCategories.includes('Category1')
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              } py-1 px-4 rounded-full text-lg mr-4`}
            >
              Category1
            </button>
            */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlaces.map((place, index) => (
              <Place
                key={index}
                name={place.name}
                location={place.location}
                selectedCategories={place.selectedCategories}
                rating={place.rating}
                reviews={place.reviews}
                onDelete={() => handleDeletePlace(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
export default Places;
