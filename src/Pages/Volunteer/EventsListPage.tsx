import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import Footer from '../../Components/Common/Footer';
import Calendar from '../../Components/Common/Calender';
import EventCard from '../../Components/VolunteerComponents/EventCard';
import { getEventsFilteredByCategory, getEventsFilteredByDateRange, searchEvents } from '../../Api/communityApi';
import { getNotEnrolledEvents } from '../../Api/volunteerApi';
import { useNavigate } from 'react-router-dom';
import { BiSearch, BiFilter } from 'react-icons/bi';
import Slider from 'react-slick';
import Event from '../../Interface/events';

const EventsListPage: React.FC = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getNotEnrolledEvents();
                console.log(response);
                const fetchedEvents = response?.data?.data || [];
                const upcomingEvents = fetchedEvents.filter((event:any) =>
                    event.shifts.some((shift: any) => new Date(shift.date) >= new Date())
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

    const handleDateClick = (date: Date) => {
        const selectedDateEvents = events.filter(event =>
            event?.shifts.some((shift: any) => new Date(shift.date).toDateString() === date.toDateString())
        );
        setFilteredEvents(selectedDateEvents);
    };

    const handleFilterEvents = async () => {
        if (startDate && endDate) {
            try {
                const response = await getEventsFilteredByDateRange(startDate, endDate);
                const filteredByDateRange = response?.result || [];
                const upcomingEvents = filteredByDateRange.filter((event:any) =>
                    event.shifts.some((shift: any) => new Date(shift.date) >= new Date())
                );
                setFilteredEvents(upcomingEvents);
            } catch (error) {
                console.error('Failed to filter events by date range:', error);
            }
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            try {
                const response = await searchEvents(searchQuery);
                console.log(response?.events);
                const searchedEvents = response?.events || [];
                const upcomingEvents = searchedEvents.filter((event:any) =>
                    event.shifts.some((shift:any) => new Date(shift.date) >= new Date())
                );
                setFilteredEvents(upcomingEvents);
            } catch (error) {
                console.error('Failed to search events:', error);
            }
        } else {
            setFilteredEvents(events);
        }
    };

    const categories = [
        { name: 'Health care', image: '../bermix-studio-NztECzFtPyw-unsplash.jpg' },
        { name: 'Education', image: '../patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg' },
        { name: 'Shelters and Support', image: '../andrik-langfield-ujx_KIIujRg-unsplash.jpg' },
        { name: 'Food', image: '../maja-petric-vGQ49l9I4EE-unsplash.jpg' },
        { name: 'Child Welfare', image: '../larm-rmah-AEaTUnvneik-unsplash.jpg' },
        { name: 'Youth Recreation', image: '../jeffrey-f-lin-QV47mIeSm64-unsplash.jpg' },
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handleCategoryFilter = async (name: string) => {
        try {
            const response = await getEventsFilteredByCategory(name);
            const filteredByCategory = response?.data?.result || [];
            const upcomingEvents = filteredByCategory.filter((event:any) =>
                event.shifts.some((shift:any) => new Date(shift.date) >= new Date())
            );
            setFilteredEvents(upcomingEvents);
        } catch (error) {
            console.error('Failed to filter events by category:', error);
        }
    };

    return (
        <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter min-h-screen flex flex-col'>
            <NavBar />
            <main className="flex-1 container mx-auto p-4 pt-20">
                <h1 className="text-3xl font-bold">Welcome, Admin <span role="img" aria-label="wave">👋</span></h1>
                <Slider {...settings} className="w-full pt-10">
                    {categories.map((category, index) => (
                        <div key={index} className="relative w-44 h-44 pl-2 overflow-hidden rounded-lg group" >
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg" onClick={() => handleCategoryFilter(category.name)}>
                                <p className="text-white font-bold text-center">{category.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="mt-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3">
                        <Calendar events={events} onDateClick={handleDateClick} />
                        <div className="mt-4">
                            <label htmlFor="start-date" className="sr-only">Start Date</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <label htmlFor="end-date" className="sr-only">End Date</label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <button
                                onClick={handleFilterEvents}
                                aria-label="Filter Events"
                                className="bg-green-600 text-white px-2 py-2 rounded flex items-center"
                            >
                                <BiFilter />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 mt-3 md:mt-0 md:ml-4">
                        <h2 className="text-2xl font-bold mt-1 mb-2">Your upcoming events</h2>
                        <div className="flex space-x-2 mb-4">
                            <label htmlFor="search-events" className="sr-only">Search Events</label>
                            <input
                                type="text"
                                id="search-events"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            <button
                                onClick={handleSearch}
                                aria-label="Search Events"
                                className="bg-green-600 text-white px-2 py-2 rounded flex items-center"
                            >
                                <BiSearch />
                            </button>
                        </div>
                        {filteredEvents?.length !== 0 ? (
                            <>
                                {filteredEvents?.map((event, index) => (
                                    <EventCard
                                        key={index}
                                        date={new Date(event?.shifts[0].date).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                        title={event?.name}
                                        description={event?.details}
                                        location={event?.city}
                                        volunteers={event?.volunteers?.length}
                                        image={event?.images[0] as string}
                                        onClick={() => handleEventClick(event._id as string)}
                                        isOnline={event?.is_online}
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

export default EventsListPage;
