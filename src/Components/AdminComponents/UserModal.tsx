import React from 'react';
import User from '../../Interface/user'; // Make sure this import path is correct

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-80 p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h3 className="text-xl text-white font-semibold text-center mb-4">User Details</h3>
        <div className="mb-4 text-center text-white">
          <img src={user.profileImage} alt={user.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Amount Donated:</strong> {user.donationsFund}</p>
          <p><strong>No. of Essentials Donated:</strong> {user.donationsEssentials}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Phone Number:</strong> {user.phone}</p>
          
          {/* <p><strong>Posts:</strong> {user.posts}</p> */}
        </div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
