// src/components/UpcomingEvents.tsx
import React from 'react';

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Your Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Jessore", "Jessore", "Jessore"].map((location, index) => (
            <div key={index} className="relative">
              <img src="https://via.placeholder.com/300x200" alt={location} className="w-full rounded-lg" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-4 w-full rounded-b-lg">
                <h3 className="text-lg font-bold">{location}</h3>
                <p>01.01.2024</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">View Complete Schedule</button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
