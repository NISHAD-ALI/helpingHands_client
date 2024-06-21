import React from 'react';
import volunteerHeroSection from '../../Interface/volunteerHeroSection';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC<volunteerHeroSection> = ({ imageSrc, title, title1, description, buttonText }) => {
  const navigate = useNavigate()
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start">
        <div className="md:flex-1 md:order-2 p-4">
          <img src={imageSrc} alt={title} className="w-full h-auto md:h-80 object-cover rounded-lg" />
        </div>
        <div className="md:flex-1 mt-10 md:order-1 md:pr-8 p-4">
          <h2 className="text-3xl font-bold mb-4">
            {title}<br />
            <span className="text-green-500">{title1}</span>
          </h2>
          <p className="text-black mb-4">{description}</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={()=>navigate('/volunteer/events')}>
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
