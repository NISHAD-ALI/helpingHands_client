import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import HeroSection from '../../Components/VolunteerComponents/HeroSection';
import CommunityCard from '../../Components/VolunteerComponents/CommunityCard';
import { getCommunities } from '../../Api/adminApi';
import Footer from '../../Components/Common/Footer';

const HomePage = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await getCommunities();
        setCommunities(response?.data?.communities || []);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };
    fetchCommunities();
  }, []);

  return (
    <div className='bg-gradient-to-br from-teal-50 to-green-200 font-inter'>
      <NavBar />
      
     

      <HeroSection
        imageSrc="/public/joel-muniz-A4Ax1ApccfA-unsplash.jpg"
        title="You make the world a"
        title1="better place."
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic It has survived not only five centuries, but also the leap into electronic Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"
        buttonText="Schedule an event" 
      />
      
      <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-6xl mt-8">Discover Communities</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((community, index) => (
          <CommunityCard
            key={index}
            id={community._id}
            description={community?.description}
            imageSrc={community?.profileImage}
            location={community?.name}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
