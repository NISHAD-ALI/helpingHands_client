import React from 'react';

interface ApplicationCardProps {
  name: string;
  image: string;
  onAccept: () => void; // Define onAccept prop as a function
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ name, image, onAccept }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded mb-4">
      <img src={image} alt={`${name}`} className="h-12 w-12 rounded-full mr-4" />
      <div className="flex-1">
        <p className="font-bold">{name}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded">Accept</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Decline</button>
      </div>
    </div>
  );
};

export default ApplicationCard;
