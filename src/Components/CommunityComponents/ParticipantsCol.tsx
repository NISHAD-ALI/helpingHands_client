import React from 'react';

const ParticipantsCol: React.FC = () => {
  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Paticipants:</h3>
      <div className="flex space-x-4">
        <img src="../ian-dooley-d1UPkiFd04A-unsplash.jpg" alt="Ana White" className="w-12 h-12 rounded-full" />
        <img src="../aiony-haust-3TLl_97HNJo-unsplash.jpg" alt="Ian Blue" className="w-12 h-12 rounded-full" />
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300">+66</div>
      </div>
    </div>
  );
};

export default ParticipantsCol;
