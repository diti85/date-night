import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import VerificationModal from './VerificationModal';
import { useContext } from 'react';
import { useEffect } from 'react';
import AuthContext from '../AuthContext';
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
  };
  const { authenticated, login  } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleVerificationSuccess = () => {
    // Implement your redirection logic here
    login();
    navigate('/places');
    

    //insert a rose.png before the Hola Mi Amor text

  };
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center margin">
        <div className="max-w-md mx-auto px-4 flex flex-col justify-center items-center">
      <motion.img
        src="/assets/rose.png"
        alt="Rose"
        className="w-80 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      />
      <motion.h1
        className="text-4xl text-red-500 mb-4 font-semibold"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        Hola Dondi!
      </motion.h1>
      <motion.p
        className="text-white text-lg mb-8 text-center"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
       Mi amor, te amo más de lo que las palabras pueden describir. Ahorita, que quieres comer?
      </motion.p>
      <motion.button
        className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        onClick={handleModalOpen}
      >
        No tengo hambre 🙄
      </motion.button>
      <VerificationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleVerificationSuccess}
      />
      </div>
    </div>
  );
};

export default Home;
