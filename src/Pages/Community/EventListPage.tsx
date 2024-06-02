import React, { useEffect, useState } from 'react'
import Calendar from '../../Components/Common/Calender'
import NavBar from '../../Components/CommunityComponents/NavBar'
import EventCard from '../../Components/VolunteerComponents/EventCard'
import Footer from '../../Components/Common/Footer'
import { getEvents } from '../../Api/communityApi'
import { useNavigate } from 'react-router-dom'
const EventListPage: React.FC = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            console.log(response?.data?.events?.events);
            setEvents(response?.data?.events?.events);

        }
        fetchEvents();
    }, [])
    const handleEventClick = (id: string) => {
        console.log(id+"---")
        navigate(`/community/event/${id}`);
    };
    return (

        <>
            <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter min-h-screen flex flex-col'>
                <NavBar />
                <main className="flex-1 container mx-auto p-4 pt-20">
                    <h1 className="text-3xl font-bold">Welcome, Nishad <span role="img" aria-label="wave">👋</span></h1>
                    <div className="mt-4 flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3">
                            <Calendar />
                        </div>
                        <div className="flex-1 mt-4 md:mt-0 md:ml-4">
                            <h2 className="text-2xl font-bold">Your upcoming events</h2>
                            {events.length !== 0 ? (
                                <>
                                    {events.map((event, index) => (
                                        <EventCard
                                            key={index}
                                            date={event?.shifts[0].date}
                                            title={event?.name}
                                            description={event?.details}
                                            location="Calicut, Kerala"
                                            volunteers={event?.volunteers.length}
                                            image={event?.images[0]}
                                            onClick={() => handleEventClick(event._id)}
                                        />
                                    ))}
                                    {/* <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">Next</button> */}
                                </>
                            ) : (
                                <h3>You have no upcoming Events</h3>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default EventListPage
