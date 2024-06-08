import React, { useEffect, useState } from 'react';

import Counter from '../../Components/CommunityComponents/Counter';
import ProjectDetails from '../../Components/CommunityComponents/ProjectDetails';
import Footer from '../../Components/Common/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventsById } from '../../Api/communityApi';
import { enrollToEvents } from '../../Api/volunteerApi';
import NavBar from '../../Components/VolunteerComponents/NavBar';

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [eventDate, setEventDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getEventsById(id);
            if (response?.data?.event?.shifts?.length > 0) {
                setEventDate(new Date(response.data.event.shifts[0].date));
            }
        };
        fetchEvent();
    }, [id]);


    const handleEnroll = async() => {
        try {
            const response = await enrollToEvents(id as string)
            if(response.data.success){
                console.log(response?.data)
                navigate('/volunteer/events');
            }
        } catch (error :any) {
            console.log(error.message)
        }
       
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>
                {eventDate && <Counter eventDate={eventDate} />}
                <ProjectDetails />
                <div className="flex justify-center mt-10 ">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={handleEnroll} >Enroll to event</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EventPage;
