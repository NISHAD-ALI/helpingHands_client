import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'flowbite-react';
import ReactPlayer from 'react-player';
import ParticipantsCol from './ParticipantsCol';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../../Api/communityApi';

const ProjectDetails: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
      const fetchEvent = async () => {
          console.log(id);
          const response = await getEventsById(id);
          console.log(response?.data?.event);
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
    <img key={1} src={event?.images[0]} alt="Project" className="w-full rounded-md mb-4" />,
    <img key={2} src={event?.images[1]} alt="Project" className="w-full rounded-md mb-4" />,
    <img key={3} src={event?.images[2]} alt="Project" className="w-full rounded-md mb-4" />,
    <div key={4} className="w-full h-full flex items-center justify-center bg-black rounded-md mb-4">
      <ReactPlayer
        ref={playerRef}
        url={event?.video}
        width="100%"
        height="100%"
        playing={currentSlide === 3 && isPlaying}
        onEnded={handleVideoEnd}
      />
    </div>
  ];

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
          {event?.shifts?.map((shift, index) => (
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
