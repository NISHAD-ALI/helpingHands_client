import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import Footer from '../../Components/Common/Footer';
import EventCard from '../../Components/VolunteerComponents/EventCard';
import { getEnrolledEvents } from '../../Api/volunteerApi';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import Event from '../../Interface/events';

const MyEventsPage: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[] | any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState<Event[] | any>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEnrolledEvents();
                console.log(response?.data.data.events);
                const fetchedEvents = response?.data.data.events || [];
                
                const upcomingEvents = fetchedEvents.filter((event:Event) =>
                    event.shifts.some((shift: any) => new Date(shift.date) > new Date())
                );
                setEvents(upcomingEvents);
                setFilteredEvents(upcomingEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleEventClick = (id: string) => {
        navigate(`/volunteer/event/${id}`);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            const searchedEvents = events.filter((event:Event) =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEvents(searchedEvents);
        } else {
            setFilteredEvents(events);
        }
    };

    return (
        <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter min-h-screen flex flex-col'>
            <NavBar />
            <main className="flex-1 container mx-auto p-4 pt-20">
                <h1 className="text-3xl font-bold">My Events <span role="img" aria-label="wave">🎉</span></h1>
                <div className="mt-4 flex flex-col md:flex-row">
                    <div className="flex-1 mt-3 md:mt-0 md:ml-4">
                        <div className="flex space-x-2 mb-4">
                            <input
                                type="text"
                                placeholder="Search my events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            <button
                            aria-label='search'
                                onClick={handleSearch}
                                className="bg-green-600 text-white px-2 py-2 rounded flex items-center"
                            >
                                <BiSearch />
                            </button>
                        </div>
                        {filteredEvents.length !== 0 ? (
                            <>
                                {filteredEvents.map((event:Event, index:number) => (
                                    <EventCard
                                        key={index}
                                        date={new Date(event.shifts[0].date).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                        title={event.name}
                                        description={event.details}
                                        location={event.city}
                                        volunteers={event?.volunteers?.length || 0}
                                        image={event.images[0] as string}
                                        onClick={() => handleEventClick(event._id as string)}
                                        isOnline={event.is_online}
                                        isEnrolled={true}
                                    />
                                ))}
                            </>
                        ) : (
                            <h3>No events found</h3>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MyEventsPage;
