import React from 'react';

interface EventCardProps {
  date: string;
  title: string;
  description: string;
  location: string;
  volunteers: number;
}

const EventCard: React.FC<EventCardProps> = ({ date, title, description, location, volunteers }) => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-lime-50 p-4 rounded-md shadow-md mb-4">
      <div className="flex">
        <img src="https://via.placeholder.com/100" alt="Event" className="w-24 h-24 rounded-md" />
        <div className="ml-4">
          <div className="text-red-500 font-bold text-xl">{date}</div>
          <div className="text-xl font-bold">{title}</div>
          <div className="text-gray-600">{description}</div>
          <div className="text-gray-500">{location}</div>
          <div className="text-gray-600">{volunteers} volunteers already enrolled</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
