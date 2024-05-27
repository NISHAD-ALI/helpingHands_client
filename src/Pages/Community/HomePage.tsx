import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import Hero from '../../Components/CommunityComponents/Hero'
import UpcomingEvents from '../../Components/CommunityComponents/UpcomingEvents'
import HireVolunteers from '../../Components/CommunityComponents/HireVolunteers'

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <UpcomingEvents />
      <div className='bg-gray-100'>
      <HireVolunteers
        imageSrc="/public/cytonn-photography-n95VMLxqM2I-unsplash.jpg"
        title="Hire Volunteers"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor..."
        buttonText="Hire Now"
      />
      </div>
      <div className='mt-8'>
      <HireVolunteers
        imageSrc="/public/12 1.jpg"
        title="Another Example"
        description="Details for the other variation..."
        buttonText="Get Involved"
      />
      </div>

    </>
  )
}

export default HomePage
