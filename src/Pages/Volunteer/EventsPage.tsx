import React from 'react'
import NavBar from '../../Components/VolunteerComponents/NavBar'
import Footer from '../../Components/Common/Footer'
import { useSelector } from 'react-redux'
import Calendar from '../../Components/Common/Calender'
import EventCard from '../../Components/VolunteerComponents/EventCard'

const EventsPage: React.FC = () => {
    const isLoggedIn = useSelector((state: any) => state.auth.volunteerData);
    console.log(isLoggedIn);

    return (
        <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter min-h-screen flex flex-col'>
            <NavBar />
            <main className="flex-1 container mx-auto p-4">
                <h1 className="text-3xl font-bold">Welcome, Nishad <span role="img" aria-label="wave">👋</span></h1>
                <div className="mt-4 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3">
                        <Calendar />
                    </div>
                    <div className="flex-1 mt-4 md:mt-0 md:ml-4">
                        <h2 className="text-2xl font-bold">Your upcoming events</h2>
                        <EventCard
                            date="SUN 01"
                            title="Elder Care visit"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            location="Calicut, Kerala"
                            volunteers={90}
                        />
                        <EventCard
                            date="SUN 01"
                            title="Elder Care visit"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            location="Calicut, Kerala"
                            volunteers={90}
                        />
                        <EventCard
                            date="SUN 01"
                            title="Elder Care visit"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            location="Calicut, Kerala"
                            volunteers={90}
                        />
                        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">Next</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default EventsPage;
