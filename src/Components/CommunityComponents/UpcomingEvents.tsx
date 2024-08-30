import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../../Api/communityApi';
import Event from '../../Interface/events'; 
const UpcomingEvents: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[] | any[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await getEvents();
            const fetchedEvents: Event[] = response?.data?.events?.events || [];
            console.log(fetchedEvents)
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };
    fetchEvents();
}, []);
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={event?.images[0]} alt={event.city} className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-xl font-bold">{event.city}</h2>
              <p className="text-sm mb-4">{event.date}</p>
              <button 
                className="px-4 py-2 bg-yellow-500 text-sm font-semibold rounded-full hover:bg-yellow-600"
                onClick={() => navigate('/community/eventList')}
              >
                View Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
