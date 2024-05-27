import React from 'react';

interface CardProps {
  imageSrc: string;
  location: string;
  description: string;
}

const CommunityCard: React.FC<CardProps> = ({ imageSrc, location, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs mx-auto mt-20">
      <img src={imageSrc} alt={location} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{location}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default CommunityCard;
