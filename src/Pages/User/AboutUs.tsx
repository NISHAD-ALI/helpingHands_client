import React from 'react';
import Nav from '../../Components/UserComponents/Nav';
import Banner from '../../Components/UserComponents/Banner';
import Footer from '../../Components/UserComponents/Footer';
import { Toaster } from 'react-hot-toast';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-green-200 font-inter">
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <Banner 
        title="About Us" 
        image="../assets/1342.png" />
      <section className="flex-grow p-10 lg:p-36 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Our Story</h2>
        <div className="z-10 flex min-h-[16rem] items-center justify-center mb-8">
          <p className="text-md text-gray-600">
            Helping Hands is a community-driven platform designed to assist both small and large-scale communities. Our platform empowers individuals passionate about helping others to establish well-organized communities and recruit volunteers who meet community expectations, contributing to collective efforts in aiding others.
          </p>
        </div>
        <p className="text-md mb-4 text-gray-600">
          Communities can create both offline and online events globally, connecting millions of volunteers who share similar community values. Users can communicate with each other and volunteers by posting about local needs, which volunteers can respond to. Users can engage with these posts by liking, commenting, and supporting fundraisers to aid communities.
        </p>
      </section>

      <section className="bg-gray-100 py-16 px-5 lg:px-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-5 bg-white shadow-lg rounded-lg transform transition hover:scale-105">
            <h3 className="text-3xl font-bold text-green-600 mb-4">Our Mission</h3>
            <p className="text-md text-gray-700">
              Our mission is to foster collaboration, allowing individuals and organizations to bring about meaningful changes by creating well-organized communities and events that positively impact society.
            </p>
          </div>
          <div className="p-5 bg-white shadow-lg rounded-lg transform transition hover:scale-105">
            <h3 className="text-3xl font-bold text-green-600 mb-4">Our Vision</h3>
            <p className="text-md text-gray-700">
              We envision a world where communities and volunteers work hand-in-hand to solve local and global challenges through technology, networking, and seamless collaboration.
            </p>
          </div>
        </div>
      </section>
    
      <section className="py-16 bg-white text-center px-5 lg:px-36">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Our Impact</h2>
        <p className="text-md text-gray-700 mb-8">
          Since its inception, Helping Hands has contributed to over 5,000 community-led initiatives, connecting more than 10 million volunteers globally. We pride ourselves on making a difference in areas such as disaster relief, community development, education, and more.
        </p>
        <p className="text-md text-gray-700">
          Join us in our mission to build a better, more connected world where everyone has the power to make a difference, one community at a time.
        </p>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Toast for alerts */}
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px', borderRadius: '10px', fontSize: '16px' } }} />
    </div>
  );
};

export default AboutUs;
