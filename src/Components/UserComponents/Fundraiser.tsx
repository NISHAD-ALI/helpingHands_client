import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fundraiser: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-green-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Fundraiser</h2>
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="../gaza.jpg"
              alt="Children in Gaza"
              className="w-full h-80 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Support Our Cause—Every Contribution Counts</h3>
            <p className="mb-6">
              Struggling amidst unimaginable challenges every day. Your support can provide essential aid, including food, shelter, healthcare, and education, offering them hope for a brighter future.
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300" onClick={() => navigate('/donate')}>Donate Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fundraiser;
