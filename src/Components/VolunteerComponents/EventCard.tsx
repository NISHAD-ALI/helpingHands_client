import React from 'react';

interface EventCardProps {
  date: string;
  title: string;
  description: string;
  location?: string;
  volunteers: any;
  image: string;
  onClick: () => void;
  isOnline?: boolean;
  isEnrolled?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ date, title, description, location, volunteers, image, onClick, isOnline, isEnrolled }) => {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-lime-50 p-4 rounded-md shadow-md mb-4 cursor-pointer" onClick={onClick}>
      {isOnline && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-bl-md">
          Online Event
        </div>
      )}
      {isEnrolled && (
        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-br-md">
          Enrolled
        </div>
      )}
      <div className="flex">
        <img src={image} alt="Event" className="w-24 h-24 rounded-md" />
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
