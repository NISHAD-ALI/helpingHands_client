import React from 'react';

interface EventCardProps {
    date: string;
    title: string;
    description: string;
    location: string;
    volunteers: number;
    image: string;
    onClick: () => void;
    isOnline: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ date, title, description, location, volunteers, image, onClick, isOnline }) => {
    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4" onClick={onClick}>
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${image})` }} title={title}>
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{description}</p>
                </div>
                <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">{location}</p>
                        <p className="text-gray-600">{date}</p>
                        <p className="text-gray-600">{volunteers} volunteers</p>
                        <p className="text-gray-600">{isOnline ? 'Online Event' : 'In-person Event'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
