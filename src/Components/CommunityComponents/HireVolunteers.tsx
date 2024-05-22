import React from 'react';

const HireVolunteers: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <img src="/public/cytonn-photography-n95VMLxqM2I-unsplash.jpg" alt="Hire Volunteers" className="w-full md:w-1/2 rounded-lg" />
        <div className="md:ml-8 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Hire Volunteers</h2>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Hire Now</button>
        </div>
      </div>
    </section>
  );
};

export default HireVolunteers;
