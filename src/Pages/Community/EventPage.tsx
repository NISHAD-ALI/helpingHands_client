import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/CommunityComponents/NavBar';
import Counter from '../../Components/CommunityComponents/Counter';
import ProjectDetails from '../../Components/CommunityComponents/ProjectDetails';
import Footer from '../../Components/Common/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, getEventsById } from '../../Api/communityApi';
import { Toaster } from 'react-hot-toast';
import Event from '../../Interface/events';

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [data, setData] = useState<Event | any>([]);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getEventsById(id as string);
            setData(response?.data?.event);
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
            <NavBar bgColor="bg-gray-600" />
            <header className="bg-gradient-to-r from-gray-800 to-neutral-600 text-white py-12 mt-16 rounded-lg">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">{data?.name}</h1>
                    <p className="text-lg">Manage your event with ease</p>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-6 md:p-12">
                <h2 className="text-2xl font-semibold mb-4">Welcome, Admin 👋</h2>
                {eventDate && <Counter eventDate={eventDate} />}
                <ProjectDetails />
                <div className="flex flex-col md:flex-row justify-between mt-8 space-y-4 md:space-y-0">
                    <button
                        className="bg-red-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                        onClick={handleDelete}
                    >
                        Cancel Event
                    </button>
                    <button
                        className="bg-yellow-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                        onClick={handleEdit}
                    >
                        Edit Event
                    </button>
                    {data?.is_online && (
                        <button
                            className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                            onClick={handleStart}
                        >
                            Start Event
                        </button>
                    )}
                </div>
            </main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
};

export default EventPage;
