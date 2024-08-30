import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import NavBar from '../../Components/CommunityComponents/NavBar';
import UpcomingEvents from '../../Components/CommunityComponents/UpcomingEvents';
import Footer from '../../Components/UserComponents/Footer';
import NotificationComponent from '../../Components/Common/NotificationComponent';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<{ message: string; id: number }[]>([]);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    socket.on('receiveNotification', (notification: any) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: notification.message, id: Date.now() },
      ]);
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
  }, []);

  return (
    <>
      <NavBar bgColor="transparent" />

      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("../8k.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-500 opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to your community console</h1>
          <p className="text-2xl font-semibold mb-8">Thank you for Making a Difference</p>
          <button
            className="px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
            onClick={() => navigate('/community/eventList')}
          >
            Explore Events
          </button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <img
                src="../hireVolunterr.jpg"
                alt="Hire Volunteers"
                className="w-full h-48 object-cover mb-6 rounded"
              />
              <h3 className="text-xl font-semibold mb-4">Hire Volunteers</h3>
              <p className="mb-6 text-gray-700">
                Connect with passionate volunteers to make your event successful.
              </p>
              <button
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => navigate('/community/hireNow')}
              >
                Hire Now
              </button>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <img
                src="../leader.jpg"
                alt="Create Event"
                className="w-full h-48 object-cover mb-6 rounded"
              />
              <h3 className="text-xl font-semibold mb-4">Create Your Event</h3>
              <p className="mb-6 text-gray-700">
                Plan, organize, and execute impactful events with ease.
              </p>
              <button
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => navigate('/community/createEvents')}
              >
                Create an Event
              </button>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <img
                src="../public/josh-appel-0nkFvdcM-X4-unsplash.jpg"
                alt="Manage Volunteers"
                className="w-full h-48 object-cover mb-6 rounded"
              />
              <h3 className="text-xl font-semibold mb-4">Manage Your Volunteers</h3>
              <p className="mb-6 text-gray-700">
                Effectively manage your team of volunteers and keep them engaged.
              </p>
              <button
                className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => navigate('/community/manageVolunteers')}
              >
                Manage Volunteers
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='p-5'>
      <UpcomingEvents />
      </div>
      <NotificationComponent notifications={notifications} removeNotification={removeNotification} />

      <Footer />
    </>
  );
};

export default HomePage;
