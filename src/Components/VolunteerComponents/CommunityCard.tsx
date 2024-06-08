import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  imageSrc: string;
  location: string;
  description: string;
  id:string;
}

const CommunityCard: React.FC<CardProps> = ({ imageSrc, location, description,id }) => {
  const defaultImage = '/public/joel-muniz-A4Ax1ApccfA-unsplash.jpg';
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/volunteer/community/${id}`)
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs mx-auto mt-20 " onClick={handleClick}>
      <img src={imageSrc || defaultImage} alt={location} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{location}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default CommunityCard;

