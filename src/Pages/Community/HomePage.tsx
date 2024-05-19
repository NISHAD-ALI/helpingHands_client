import React from 'react'
import NavBar from '../../Components/CommunityComponents/NavBar'
import Hero from '../../Components/CommunityComponents/Hero'
import UpcomingEvents from '../../Components/CommunityComponents/UpcomingEvents'
import HireVolunteers from '../../Components/CommunityComponents/HireVolunteers'

const HomePage:React.FC = () => {
  return (
    <>
    <NavBar/>
    <Hero/>
    <UpcomingEvents/>
    <HireVolunteers/>
    </>
  )
}

export default HomePage
