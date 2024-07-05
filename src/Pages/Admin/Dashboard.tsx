import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/AdminComponents/Sidebar';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FaHandHoldingHeart, FaUsers, FaHandHoldingUsd, FaCalendarAlt } from 'react-icons/fa';
import StatCard from './StatCard';
import { getAllEvents, getAllReports, getAllVolunteers, getCommunities, getDonations } from '../../Api/adminApi';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getCoordinates } from '../../Api/geocode';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard: React.FC = () => {
  const [donations, setDonations] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [reportedPost, setReportedPost] = useState<any>(null);
  const [eventCoordinates, setEventCoordinates] = useState([]);
  const navigate = useNavigate();
  let totalAmountCollected = donations.reduce((total, fund) => total + fund?.amountCollected, 0);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonations();
        if (response?.data?.donations) {
          console.log(response.data.donations);
          setDonations(response.data.donations);
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await getCommunities();
        console.log(response?.data?.communities);
        setCommunities(response?.data?.communities || []);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      }
    };
    fetchCommunities();
  }, []);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await getAllVolunteers();
        const res = response?.data?.volunteers;
        console.log("RES::", res);
        setVolunteers(res);
      } catch (error) {
        console.error('Failed to fetch volunteers', error);
      }
    };
    fetchVolunteers();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const res = response?.data?.events;
        setEvents(res);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchReportedPost = async () => {
      try {
        const response = await getAllReports();
        const res = response?.data?.reports;
        console.log(res);
        setReportedPost(res[res.length - 1].postId ? res[res.length - 1] : res[res.length - 2]);
      } catch (error) {
        console.error('Failed to fetch reported posts', error);
      }
    };
    fetchReportedPost();
  }, []);

  useEffect(() => {
    const fetchEventCoordinates = async () => {
      const coordinatesPromises = events.map(async event => {
        console.log("CITY",event.city)
        const coords = await getCoordinates(event?.city);
        console.log(coords)
        return {
          ...event,
          location: coords
        };
      });

      const resolvedCoordinates :any = await Promise.all(coordinatesPromises);
      setEventCoordinates(resolvedCoordinates);
    };

    if (events.length > 0) {
      fetchEventCoordinates();
    }
  }, [events]);

  const sortedDonations = donations.sort((a, b) => b.amountCollected - a.amountCollected).slice(0, 3);

  const pieData = {
    labels: sortedDonations.map(donation => donation.name),
    datasets: [
      {
        label: 'User Donations',
        data: sortedDonations.map(donation => donation?.amountCollected),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lastCommunities = communities.sort((a, b) => b.events.length - a.events.length).slice(0, 3);
  console.log("LS::", lastCommunities);
  const onlineEventCounts = lastCommunities.map(community => community.events.filter(event => event.is_online === true).length);
  const offlineEventCounts = lastCommunities.map(community => community.events.filter(event => event.is_online === false).length);

  const barData = {
    labels: lastCommunities.map(community => community?.name),
    datasets: [
      {
        label: 'Online Events',
        data: onlineEventCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Offline Events',
        data: offlineEventCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <StatCard
            icon={<FaHandHoldingUsd className="text-yellow-500" />}
            label="Donation"
            value={`₹${totalAmountCollected}`}
            bgColor="bg-yellow-50"
          />
          <StatCard
            icon={<FaUsers className="text-blue-500" />}
            label="Communities"
            value={communities.length}
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={<FaHandHoldingHeart className="text-pink-500" />}
            label="Volunteers"
            value={volunteers.length}
            bgColor="bg-yellow-50"
          />
          <StatCard
            icon={<FaCalendarAlt className="text-green-500" />}
            label="Events"
            value={events.length}
            bgColor="bg-green-100"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">User Donations</h2>
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Events Organized</h2>
            <Bar data={barData} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow col-span-1" onClick={() => navigate('/admin/reportPostManagement')}>
            <h2 className="text-xl font-bold">Latest Reported Post</h2>
            {reportedPost ? (
              <div>
                <img src={reportedPost.postId.image} alt="Reported Post" className="w-full h-auto mb-4 rounded-xl" />
                <p>Reported By : <span className="font-bold">{reportedPost.reportedUsers[0].userId.name}</span></p>
                <p>Post Id : <span className="font-bold">{reportedPost.postId._id}</span></p>
                <p>{reportedPost.description}</p>
              </div>
            ) : (
              <p>No reported posts found.</p>
            )}
          </div>
          <div className="bg-white p-4 rounded shadow col-span-2">
            <h2 className="text-2xl font-bold mb-4">Recently Created Communities</h2>
            <Slider {...settings}>
              {communities.length > 0 ? (
                communities.map((community, index) => (
                  <div key={index} className="mb-6">
                    <img src={community.profileImage} alt={community.name} className="w-full h-56 object-cover mb-4 rounded-xl" />
                    <h3 className="text-xl font-bold">{community.name}</h3>
                    <p>Phone: <span className='font-bold'>{community.phone}</span></p>
                    <p>Events Conducted: <span className='font-bold'> {community.events.length}</span></p>
                    <p>Volunteers: <span className='font-bold'> {community.volunteers.length}</span></p>
                  </div>
                ))
              ) : (
                <p>No recent communities found.</p>
              )}
            </Slider>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h2 className="text-xl font-bold mb-4">Event Locations</h2>
          <MapContainer center={[20, 0]} zoom={2} style={{ height: '300px' }} className="rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
             {eventCoordinates.map(event => (
            <Marker key={event._id} position={[event.location.lat, event.location.lon]}>
              <Popup>
                <div className="popup-card bg-cover bg-center rounded-lg shadow-md text-white"
                  style={{ backgroundImage: `url(${event?.images[0]})`, backgroundSize: 'cover' }}
                >
                  <div className="popup-content p-2 bg-black bg-opacity-50 rounded">
                    <h3 className="text-sm font-semibold">{event.name}</h3>
                    <p>{event?.time}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          </MapContainer>
        </div>
      </div>
   
    </div>
  );
};

export default Dashboard;
