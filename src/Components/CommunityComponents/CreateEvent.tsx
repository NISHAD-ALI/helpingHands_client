import React from 'react';

const CreateEvent: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:mr-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Create an Event</h2>
          <p className="text-gray-600 mb-4">Children in Gaza urgently need your help. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Create Event</button>
        </div>
        <img src="https://via.placeholder.com/300x200" alt="Create Event" className="w-full md:w-1/2 rounded-lg" />
      </div>
    </section>
  );
};

export default CreateEvent;
