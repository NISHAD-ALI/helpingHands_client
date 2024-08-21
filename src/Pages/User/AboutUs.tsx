import React from 'react';
import Nav from '../../Components/UserComponents/Nav';
import Banner from '../../Components/UserComponents/Banner';
import FounderMessage from '../../Components/UserComponents/FounderMessage';
import Footer from '../../Components/UserComponents/Footer';
import TextRevealByWord from '../../Components/SpecialEffects/lib/TextRevealByWord';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-green-200 font-inter">
      <div className="sticky top-0 z-50">
      <Nav />
      </div>
      <Banner 
        title="About Us"
        image="../assets/1342.png"
      />
      <div className="flex-grow p-36  text-center">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <div className="z-10 flex min-h-[16rem] items-center justify-center">
      
    </div>
        <p className="text-md mb-4 font-inter">
        <TextRevealByWord text="Helping Hands is a community-driven platform designed to assist both small and large-scale communities. Our platform empowers individuals passionate about helping others to establish well-organized communities and recruit volunteers who meet community expectations, contributing to collective efforts in aiding others. Communities can create both offline and online events globally, connecting millions of volunteers who share similar community values. Users can communicate with each other and volunteers by posting about local needs, which volunteers can respond to. Users can engage with these posts by liking, commenting, and supporting fundraisers to aid communities." />
            
        </p>
        <FounderMessage />
      </div>
        <Footer/>
    </div>
   
  );
};

export default AboutUs;
