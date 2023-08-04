import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import VerificationModal from './VerificationModal';
import { useContext } from 'react';
import { useEffect } from 'react';
import AuthContext from '../AuthContext';
import { redirect } from 'react-router-dom';

const Home = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
  };
  const { authenticated, login } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleVerificationSuccess = () => {
    // Implement your redirection logic here
    login();
    console.log("logged in");
    //redirect to Places page
    redirect("/places");

  };
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center margin">
        <div className="max-w-md mx-auto px-4 flex flex-col justify-center items-center">
      <motion.h1
        className="text-4xl text-red-700 mb-4 font-semibold"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        Hola mi amor!
      </motion.h1>
      <motion.p
        className="text-white text-lg mb-8"
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
