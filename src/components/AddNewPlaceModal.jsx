import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, Rating, Box } from '@mui/material';

const AddNewPlaceModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [firstTime, setFirstTime] = useState('tried'); // Set a default value
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(''); 
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false); // State for the new category modal
  const [newCategoryName, setNewCategoryName] = useState('');
  //change the statically typed categories and fetch them from the backend
  useEffect(() => {
    //fetch categories from backend
    fetch('http://localhost:5000/api/categories/add')
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE FROM DB of AVAILABLE CATEGORIES", data);
        setAvailableCategories(data);
      }
      )      
      .catch((err) => console.log(err)
      )
      ;
  }, []);
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') {
      // Don't add an empty category
      return;
    }
    else{
      // Add a new category to the list and make a POST call to the database
      fetch('http://localhost:5000/api/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategoryName }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("RESPONSE FROM DB", data);
          setAvailableCategories([...availableCategories, data]);
          setSelectedCategories([...selectedCategories, data]);
        });
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };
  
  useEffect(() => {
    console.log("selectedCategories after:", selectedCategories);
  }, [selectedCategories]);
  
  
  
  const handleAddPlace = () => {
    const newPlace = {
      name,
      location,
      firstTime,
      selectedCategories,
      rating,
      reviews,
    };
    onSuccess(newPlace);
    setName('');
    setLocation('');
    setFirstTime('tried');
    setRating(0);
    setReviews('');
    setSelectedCategories([]);
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
       <div className="backdrop-blur-sm bg-white/20 rounded-lg p-8 shadow-lg relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <button
          onClick={onClose}
          className="absolute  font-semibold top-2 right-5 text-red-700 hover:text-gray-700"
        >
          Close
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Add a New Place</h2>
        <input
          type="text"
          placeholder="Place Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 bg-gray-800 text-white text-center"
        /> 
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 bg-gray-800 text-white text-center"
        />
        <div className="flex flex-wrap justify-center mb-4">
          {availableCategories.map((category) => (
            <button
              key={category}
              className={`m-1 px-4 py-2 rounded-md ${
                selectedCategories.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category.category}
            </button>
          ))}
          {/* Button to add a new category */}
          <button
            onClick={() => setIsAddingCategory(true)}
            className="m-1 px-4 py-2 rounded-md bg-green-500 text-white"
          >
            + Add Category
          </button>
        </div>
        
        {/* Modal for adding a new category */}
        {isAddingCategory && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-xl font-semibold text-center mb-2">Add a New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 bg-gray-200 text-black text-center"
            />
            <button
              onClick={handleAddCategory}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add Category
            </button>
          </div>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' , alignContent:'center', alignItems:'center',flexDirection: 'row', p: 1, m: 1 }}>
        <FormControl component="fieldset" className="text-white text-center text-2xl">
        <FormLabel component="legend">
            <h3 className='text-xl font-semibold'></h3>
        </FormLabel>
        <RadioGroup
            aria-label="place-type"
            name="place-type"
            value={firstTime}
            onChange={(e) => setFirstTime(e.target.value)}
            className="flex justify-center"
        >
            <FormControlLabel value="tried" control={<Radio />} label="We tried it already" />
            <FormControlLabel value="wantToGo" control={<Radio />} label="I want to go here" />
        </RadioGroup>
        </FormControl>
        </Box>
        <h3 className='text-xl font-semibold mt-4 mb-2 text-center text-white'>How fancy is it?</h3>
        <Box sx={{ display: 'flex', justifyContent: 'center' , alignContent:'center', alignItems:'center',flexDirection: 'row', p: 1, m: 1 }}>
        <Rating
          name="rating"
          value={rating}
          classes={{ iconFilled: 'text-red-500', iconHover: 'text-red-500',/*center item*/ }    }   
          onChange={(e, newValue) => setRating(newValue)}
          precision={0.5}
        />
        </Box>
        <h3 className='text-xl font-semibold mt-4 mb-2 text-center text-white'>Que opinas?</h3>
        <textarea
          placeholder="Notes for next time"
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}          
          className="w-full p-2 border rounded-md mb-4 resize-none focus:outline-none focus:ring focus:ring-blue-500 bg-gray-800 text-white text-center"
          rows="4"
          
        />
        
        <button
          onClick={handleAddPlace}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Place
        </button>
        </div>
    </Modal>
  );
};

export default AddNewPlaceModal;
