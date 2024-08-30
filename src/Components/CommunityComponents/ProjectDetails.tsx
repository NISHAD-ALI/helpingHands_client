import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'flowbite-react';
import ReactPlayer from 'react-player';
import ParticipantsCol from './ParticipantsCol';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../../Api/communityApi';
import { Shift } from '../../Interface/events';

const ProjectDetails: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<any | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getEventsById(id as string);
            setEvent(response?.data?.event);
        };
        fetchEvent();
    }, [id]);

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    const handleVideoEnd = () => {
        setCurrentSlide(currentSlide + 1);
        setIsPlaying(false);
    };

    const slides = [
        event?.images[0] && (
            <div key={1} className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <img src={event.images[0] as string} alt="Project" className="object-cover w-full h-full" />
            </div>
        ),
        event?.images[1] && (
            <div key={2} className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <img src={event.images[1] as string} alt="Project" className="object-cover w-full h-full" />
            </div>
        ),
        event?.images[2] && (
            <div key={3} className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <img src={event.images[2] as string} alt="Project" className="object-cover w-full h-full" />
            </div>
        ),
        event?.video && (
            <div key={4} className="w-full h-96 bg-black rounded-lg flex items-center justify-center">
                <ReactPlayer
                    ref={playerRef}
                    url={event.video as string}
                    width="100%"
                    height="100%"
                    playing={currentSlide === 3 && isPlaying}
                    onEnded={handleVideoEnd}
                />
            </div>
        )
    ].filter(Boolean);

    return (
        <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-3/5 w-full mb-8 md:mb-0">
                <Carousel slide={currentSlide as any} onSlideChange={handleSlideChange} indicators={true} pauseOnHover>
                    {slides}
                </Carousel>
            </div>
            <div className="md:w-2/5 w-full bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Project: {event?.name}</h2>
                <ParticipantsCol />
                <div className="text-gray-700 mt-6">
                    {event?.shifts?.map((shift: Shift, index: number) => (
                        <div key={index} className="mb-4">
                            <p><strong>Date:</strong> {new Date(shift.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {shift.timeSlot}</p>
                        </div>
                    ))}
                </div>
                <p className="text-gray-700 mt-4">
                    {event?.details}
                </p>
            </div>
        </div>
    );
};

export default ProjectDetails;
