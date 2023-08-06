import React, { useState } from 'react';
import Modal from 'react-modal';
import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, Rating, Box } from '@mui/material';

const AddNewPlaceModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [firstTime, setFirstTime] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(2.5); // Set a default rating
  const [reviews, setReviews] = useState('');

  const handleAddPlace = () => {
    const newPlace = {
      name,
      location,
      firstTime,
      category,
      rating,
      reviews,
    };
    onSuccess(newPlace);
    onClose();
  };

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
          className="absolute top-2 right-2 text-black hover:text-gray-700"
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
        <h3 className='text-xl font-semibold mt-4 mb-2 text-center text-white'>Rate It</h3>
        <Box sx={{ display: 'flex', justifyContent: 'center' , alignContent:'center', alignItems:'center',flexDirection: 'row', p: 1, m: 1 }}>
        <Rating
          name="rating"
          value={rating}
          classes={{ iconFilled: 'text-red-500', iconHover: 'text-red-500',/*center item*/ }    }   
          onChange={(e, newValue) => setRating(newValue)}
          precision={0.5}
        />
        </Box>
        <h3 className='text-xl font-semibold mt-4 mb-2 text-center text-white'>Comments</h3>
        <textarea
          placeholder="Any comments?"
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
