import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import VerificationModal from './components/VerificationModal';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './AuthProvider';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  
  );
};

export default App;
