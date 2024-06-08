import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import UpcomingEvents from '../../Components/CommunityComponents/UpcomingEvents'
import HireVolunteers from '../../Components/CommunityComponents/HireVolunteers'
import CreateEvent from '../../Components/CommunityComponents/ScheduleEvent'
import Footer from '../../Components/UserComponents/Footer'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const handleRouteToCe = () => {
    navigate('/community/createEvents')
  }
  const handleRouteToManageVolun = () => {
    navigate('/community/manageVolunteers')
  }
  const handleRouteToHireNow = () => {
    navigate('/community/hireNow')
  }
  return (
    <>
      <NavBar />
      <UpcomingEvents />
      <HireVolunteers
        imageSrc="/public/cytonn-photography-n95VMLxqM2I-unsplash.jpg"
        title="Hire Volunteers"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor..Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
        buttonText="Hire Now"
        click={handleRouteToHireNow}
      />
      <div className='mt-8 bg-gray-100'>
        <CreateEvent
          imageSrc="/public/12 1.jpg"
          title="Create Your Event"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor..Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
          buttonText="Create an Event"
          click={handleRouteToCe}
        />
      </div>
      <HireVolunteers
        imageSrc="/public/The Comprehensive List Of How And Where To Volunteer In Columbus.jpg"
        title="Manage your Volunteers"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor..Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
        buttonText="Manage volunteers"
        click={handleRouteToManageVolun}
      />
      <Footer />
    </>
  )
}

export default HomePage;
