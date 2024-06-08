import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/VolunteerComponents/NavBar'
import Footer from '../../Components/Common/Footer'
import { useSelector } from 'react-redux'
import Calendar from '../../Components/Common/Calender'
import EventCard from '../../Components/VolunteerComponents/EventCard'
import { getEvents } from '../../Api/volunteerApi'
import { useNavigate } from 'react-router-dom'

const EventsListPage: React.FC = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [events,setEvents] = useState([])
    const isLoggedIn = useSelector((state: any) => state.auth.volunteerData);
    console.log(isLoggedIn);
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            console.log(response?.data?.data)
            setEvents(response?.data?.data);
            setFilteredEvents(response?.data?.data);
        };
        fetchEvents();
    }, []);



console.log(filteredEvents)

    const handleEventClick = (id: string) => {
        navigate(`/volunteer/event/${id}`);
    };

    const handleDateClick = (date: Date) => {
        const selectedDateEvents = events.filter(event =>
            event.shifts.some(shift => new Date(shift.date).toDateString() === date.toDateString())
        );
        setFilteredEvents(selectedDateEvents);
    };

    const handleFilterEvents = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const filtered = events.filter(event =>
                event.shifts.some(shift => {
                    const shiftDate = new Date(shift.date);
                    return shiftDate >= start && shiftDate <= end;
                })
            );
            setFilteredEvents(filtered);
        }
    };


    return (
        <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter min-h-screen flex flex-col'>
            <NavBar />
            <main className="flex-1 container mx-auto p-4 pt-20">
                    <h1 className="text-3xl font-bold">Welcome, Admin <span role="img" aria-label="wave">👋</span></h1>
                    <div className="mt-4 flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3">
                            <Calendar events={events} onDateClick={handleDateClick} />
                            <div className="mt-4">
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <button
                                        onClick={handleFilterEvents}
                                        className="bg-green-600 text-white px-2 py-2 rounded"
                                    >
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 mt-4 md:mt-0 md:ml-4">
                            <h2 className="text-2xl font-bold">Your upcoming events</h2>
                            {filteredEvents?.length !== 0 ? (
                                <>
                                    {filteredEvents?.map((event, index) => (
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
                                </>
                            ) : (
                                <h3>You have no upcoming Events</h3>
                            )}
                        </div>
                    </div>
                </main>
            <Footer />
        </div>
    )
}

export default EventsListPage;
