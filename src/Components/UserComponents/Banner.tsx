import React from 'react';

interface BannerProps {
  title: string;
  image: string;
}

const Banner: React.FC<BannerProps> = ({ title, image }) => {
  return (
    <div className="relative h-96">
      <img 
        src={image} 
        alt={title} 
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
        {title}
      </div>
    </div>
  );
};

export default Banner;
