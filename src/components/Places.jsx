import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Place from './Place';
import AddNewPlaceModal from './AddNewPlaceModal';
import PlaceModal from './PlaceModal';
const Places = () => {
  //this variable holds the places that get loaded on page load
  const [places, setPlaces] = useState([]);
  //varialbe that checks if modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);
  //variable that holds the filtered places
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  //variable that holds the selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  //variable that holds the categories 
  const [categories, setCategories] = useState([]);
  //variable that checks if place modal is open or not
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'api/places', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE FROM DB", data);

        // Ensure that selectedCategories is always an array
        const placesWithArrayCategories = data.map((place) => ({
          ...place,
          selectedCategories: Array.isArray(place.selectedCategories)
            ? place.selectedCategories
            : [place.selectedCategories],
        }));

        setPlaces(placesWithArrayCategories);
        setFilteredPlaces(placesWithArrayCategories); 

      });

      fetch(import.meta.env.VITE_API_URL + 'api/categories/' , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        //loop thru the array and set the categories
        setCategories(data);
        setAvailableCategories(data);
      })
      .catch((err) => console.log(err));
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
      fetch(import.meta.env.VITE_API_URL  + 'api/places', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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

    const handleUpdatePlace = (updatedPlace) => {
      // Update the place in the list and make a PUT call to the database
      fetch(import.meta.env.VITE_API_URL + 'api/places/' + updatedPlace._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(updatedPlace),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedPlaces = places.map((place) => {
            if (place.id === data.id) {
              return data;
            } else {
              return place;
            }
          });
          setPlaces(updatedPlaces);
          setFilteredPlaces(updatedPlaces);
        });
    };

    // Function to open the PlaceModal with the selected place data
    const openPlaceModal = (placeData) => {
      setSelectedPlace(placeData);
      console.log("placeData", placeData);
      setIsPlaceModalOpen(true);
    };

    // Function to close the PlaceModal
    const closePlaceModal = () => {
      setIsPlaceModalOpen(false);
      setSelectedPlace(null);
    };
    const handleDeletePlace = (place) => {
      // Make API call to delete the place
      // console.log("PLACE DATA: ", place)
      fetch(import.meta.env.VITE_API_URL  + `api/places/${place._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },

      })
        .then((res) => res.json())
        .then(() => {
          // Remove the deleted place from the state
          const updatedPlaces = places.filter((p) => p.id !== place.id);
          setPlaces(updatedPlaces);
          setFilteredPlaces(updatedPlaces);
          // Close the PlaceModal after deletion
          closePlaceModal();
        })
        .catch((error) => {
          console.error('Error deleting place:', error);
          // You might want to handle errors here, e.g., show a notification to the user
        });
    };
    const handleCategoryFilter = (category) => {
      // Filter places by selected category
      if (category === 'All') {
        setFilteredPlaces(places);
      } else {
        const filtered = places.filter((place) =>
          place.selectedCategories.some((selectedCategory) => selectedCategory.category === category)
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
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center ">
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
          <div className="flex flex-wrap mb-4 w-full flex-wrap justify-center align-center">
            <button
              onClick={() => handleCategoryFilter('All')}
              className={`${
                selectedCategories.includes('All')
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              } py-2 px-6 rounded-full text-sm md:text-lg mr-2 mb-2 md:mb-0`}
            >
              All
            </button>
            {/* Display buttons for each unique category */}
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryFilter(category.category)}
                className={`${
                  selectedCategories.includes(category.category)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                } py-2 px-4 md:px-6 rounded-full text-sm md:text-lg mr-2 mb-2 md:mb-0`}
              >
                {category.category}
              </button>
            ))}
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
                onClick={() => openPlaceModal(place)}
              />
            ))}
          </div>
          {selectedPlace && (
            <PlaceModal
              isOpen={isPlaceModalOpen}
              onClose={closePlaceModal}
              placeData={selectedPlace}
              availableCategories={availableCategories}
              onUpdatePlace={handleUpdatePlace}
              onDeletePlace={handleDeletePlace}
            />
          )}
        </div>
      </div>
    );
  };
  

  export default Places;
