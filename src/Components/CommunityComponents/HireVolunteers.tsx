import React from 'react';
import homeVolunteer from '../../Interface/homeVolunteer';
import { useNavigate } from 'react-router-dom';
const VolunteerSection:React.FC<homeVolunteer> = ({ imageSrc, title, description, buttonText,click }) => {
  const navigate = useNavigate()
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
      <img src={imageSrc} alt={title} className="w-full md:w-1/2 rounded-lg" />
        <div className="md:ml-8 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={click}>
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
