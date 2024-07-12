import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/CommunityComponents/NavBar';
import Counter from '../../Components/CommunityComponents/Counter';
import ProjectDetails from '../../Components/CommunityComponents/ProjectDetails';
import Footer from '../../Components/Common/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, getEventsById } from '../../Api/communityApi';
import  { Toaster } from 'react-hot-toast';
import Event from '../../Interface/events';

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [data,setData] = useState<Event | any>([])

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getEventsById(id as string);
            setData(response?.data?.event)
            if (response?.data?.event?.shifts?.length > 0) {
                setEventDate(new Date(response?.data.event.shifts[0].date));
                
            }
        };
        fetchEvent();
    }, [id]);

    const handleDelete = async () => {
        const response = await deleteEvent(id as string);
        if (response) {
            navigate('/community/home');
        }
    };

    const handleEdit = () => {
        navigate(`/community/editEvent/${id}`);
    };
    const handleStart = () => {
        navigate(`/community/stream/${id}`);
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>
                {eventDate && <Counter eventDate={eventDate} />}
                <ProjectDetails />
                <div className="flex justify-between mt-4">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg" onClick={handleDelete}>Cancel Event</button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={handleEdit}>Edit Event</button>
                    {
                      data?.is_online ?
                   ( <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={handleStart}>Start Event</button>)
                   :('')
                    }
                </div>
            </main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />

        </div>
    );
};

export default EventPage;