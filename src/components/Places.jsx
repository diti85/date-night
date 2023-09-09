import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Place from './Place';
import AddNewPlaceModal from './AddNewPlaceModal';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //fetch places when page loads from database
  useEffect(() => {
    fetch('/api/places')
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE FROM DB", data);
        setPlaces(data);
      });
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddPlace = (newPlace) => {
    // Add a new place to the list make the post call to the database
    fetch('http://127.0.0.1:5000/api/places', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlace),
    }).then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE FROM DB", data);
        setPlaces([...places, data]);
      });
    //  
    //
    //

    setPlaces([...places, newPlace]);
  };

  const handleDeletePlace = (index) => {
    // Delete a place from the list
    const updatedPlaces = places.filter((place, i) => i !== index);
    setPlaces(updatedPlaces);
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
        <h1 className="text-4xl text-red-500 font-semibold mb-4">Our Favorite Places</h1>
        <button onClick={handleModalOpen} className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600 mb-4">
          Add New Place
        </button>
        <AddNewPlaceModal isOpen={isModalOpen} onClose={handleModalClose} onSuccess={handleAddPlace} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Loop through categorized places */}
        {Object.keys(categorizedPlaces).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl text-white font-semibold mb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorizedPlaces[category].map((place, index) => (
                <Place
                  key={index}
                  name={place.name}
                  location={place.location}
                  category={place.category}
                  picture={place.picture}
                  rating={place.rating}
                  reviews={place.reviews}
                  onDelete={() => handleDeletePlace(index)}
                />
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Places;
