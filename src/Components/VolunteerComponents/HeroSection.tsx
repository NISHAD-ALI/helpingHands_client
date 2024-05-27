import React from 'react';
import volunteerHeroSection from '../../Interface/volunteerHeroSection';
const HeroSection:React.FC<volunteerHeroSection> = ({ imageSrc, title,title1, description, buttonText }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
      <img src={imageSrc} alt={title} className="w-full md:w-2/4 rounded-lg object-cover" />
        <div className="md:ml-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold mb-4">{title}<br/><h2 className='text-green-500'>{title1}</h2></h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
