import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import 'flowbite';

const UpcomingEvents: React.FC = () => {
  const navigate = useNavigate();

  const events = [
    { location: "Delhi", date: "01.01.2024", image: ".../50 Community Service Ideas.jpg" },
    { location: "Calicut", date: "01.02.2024", image: ".../Gazas War Photography _Wallpaper _Photography.jpg" },
    { location: "Cochin", date: "01.03.2024", image: ".../50 Community Service Ideas.jpg" },
  ];

  return (
    <section className="relative h-screen">
      <div id="controls-carousel" className="relative h-full" data-carousel="static">
        <Carousel>
          {events.map((event, index) => (
            <div key={index} className="relative h-full" data-carousel-item={index === 0 ? "active" : undefined}>
              <img src={event.image} className="absolute block w-full h-full object-cover" alt={event.location} />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-4xl font-bold">{event.location}</h3>
                  <p className="text-2xl">{event.date}</p>
                  <button className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={() => navigate('/community/eventList')}>View Complete Schedule</button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default UpcomingEvents;
