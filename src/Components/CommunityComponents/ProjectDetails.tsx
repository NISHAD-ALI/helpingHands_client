import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'flowbite-react';
import ReactPlayer from 'react-player';
import ParticipantsCol from './ParticipantsCol';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../../Api/communityApi';
import { Shift } from '../../Interface/events';

const ProjectDetails: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<any>(0);
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
    event?.images[0] && <img key={1} src={event.images[0] as string} alt="Project" className="w-full rounded-md mb-4" />,
    event?.images[1] && <img key={2} src={event.images[1] as string} alt="Project" className="w-full rounded-md mb-4" />,
    event?.images[2] && <img key={3} src={event.images[2] as string} alt="Project" className="w-full rounded-md mb-4" />,
    event?.video && (
      <div key={4} className="w-full h-full flex items-center justify-center bg-black rounded-md mb-4">
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
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="md:w-3/5 w-full">
        <Carousel slide={currentSlide} onSlideChange={handleSlideChange} indicators={false} pauseOnHover>
          {slides}
        </Carousel>
      </div>
      <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Project: {event?.name}</h2>
        <ParticipantsCol />
        <div className="text-gray-600 mt-4">
          {event?.shifts?.map((shift: Shift, index: number) => (
            <div key={index} className="mb-2">
              <p><strong>Date:</strong> {new Date(shift.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {shift.timeSlot}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600">
          {event?.details}
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;
