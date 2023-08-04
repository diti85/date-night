import React, { useState } from 'react';
import Modal from 'react-modal';

const VerificationModal = ({ isOpen, onClose, onSuccess }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = () => {
    // Implement your verification logic here
    // For example, you can check if the entered code matches a predefined code
    if (verificationCode === 'ily') {
      onSuccess();
      onClose();
    }
    else{
        // Prompt them to try again
        alert("Who are you?")
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="backdrop-blur-sm bg-white/30 rounded-lg p-10 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-10 text-black hover:text-gray-700"
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-4">I need to check my baby is really my baby</h2>
        <input
          type="password"
          placeholder="Enter Super Secret Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Verify
        </button>
      </div>
    </Modal>
  );
};

export default VerificationModal;
