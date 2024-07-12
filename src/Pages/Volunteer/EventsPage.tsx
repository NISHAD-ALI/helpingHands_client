import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Counter from '../../Components/CommunityComponents/Counter';
import ProjectDetails from '../../Components/CommunityComponents/ProjectDetails';
import Footer from '../../Components/Common/Footer';
import { getEventsById } from '../../Api/communityApi';
import { enrollToEvents } from '../../Api/volunteerApi';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import toast, { Toaster } from 'react-hot-toast';
import Event from '../../Interface/events';

const EventPage: React.FC = () => {
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [event,setEvent ] = useState<Event>();

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getEventsById(id as string);
            setEvent(response?.data?.event)
            if (response?.data?.event?.shifts?.length > 0) {
                setEventDate(new Date(response?.data.event.shifts[0].date));
            }
        };
        fetchEvent();
    }, [id]);



    const handleJoinStream = async () => {
        try {
            navigate(`/volunteer/joinStream/${id}`);
            setIsStreaming(true);
        } catch (error) {
            console.error('Failed to join the stream:', error);
        }
    };


    const handleEnroll = async () => {
        try {
            const response = await enrollToEvents(id as string);
            if (response?.data.success) {
                toast.success("Enrolled successful!");
                navigate('/volunteer/events');
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Event Details</h1>
                {eventDate && <Counter eventDate={eventDate} />}
                <ProjectDetails />
                <div className="flex justify-center mt-10">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={handleEnroll}>Enroll to event</button>
                </div>
                <div className="flex justify-center mt-10">
                {event?.is_online && !isStreaming && (
                    <div className="flex justify-center mt-10">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            onClick={handleJoinStream}
                        >
                            Join Stream
                        </button>
                    </div>
                )}
                </div>
               
            </main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />

        </div>
    );
};

export default EventPage;
