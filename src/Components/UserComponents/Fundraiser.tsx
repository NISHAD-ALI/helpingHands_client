import React from 'react';
import { useNavigate } from 'react-router-dom';
const Fundraiser: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-green-200 font-inter">
      <h2 className="text-5xl font-bold text-center mb-8">Fundraiser</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="public/Gazas War Photography _Wallpaper _Photography.jpg"
            alt="Children in Gaza"
            className="w-full h-96 object-cover rounded-l"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4">Children in Gaza urgently need your help</h3>
          <p className="mb-4">
            Struggling amidst unimaginable challenges every day. Your support can provide essential aid, including food, shelter, healthcare, and education, offering them hope for a brighter future.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded" onClick={()=>navigate('/donate')}>Donate Now</button>
        </div>
      </div>
    </section>
  );
};

export default Fundraiser;
