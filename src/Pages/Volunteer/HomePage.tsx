import React from 'react'
import NavBar from '../../Components/VolunteerComponents/NavBar'
import HeroSection from '../../Components/VolunteerComponents/HeroSection'
import CommunityCard from '../../Components/VolunteerComponents/CommunityCard'

const HomePage = () => {
  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
     <NavBar />
     <HeroSection 
     imageSrc="/public/joel-muniz-A4Ax1ApccfA-unsplash.jpg"
     title="You make the world a"
     title1 = "better place."
     description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"
     buttonText="Schedule an event"/>
     <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-6xl mt-8">Discover Communities</h1>
    <CommunityCard
    description='mdvsm vsm,dv msd'
    imageSrc='/public/joel-muniz-A4Ax1ApccfA-unsplash.jpg'
    location='mkndfvndfj'
    />
    </div>

  )
}

export default HomePage
