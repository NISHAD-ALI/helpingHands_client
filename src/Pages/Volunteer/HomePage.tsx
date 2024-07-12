import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import HeroSection from '../../Components/VolunteerComponents/HeroSection';
import CommunityCard from '../../Components/VolunteerComponents/CommunityCard';
import { getCommunities } from '../../Api/adminApi';
import Footer from '../../Components/Common/Footer';
import { getAllPosts } from '../../Api/userApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NotificationComponent from '../../Components/Common/NotificationComponent';
import community from '../../Interface/community';
import Post from '../../Interface/post';


const HomePage:React.FC = () => {
  const socket = io('http://localhost:3001');
  
  const [communities, setCommunities] = useState<community[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<{ message: string, id: number }[]>([]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        console.log(response.posts);
        setPosts(response.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    socket.on('receiveNotification', (notification: any) => {
      console.log(notification.message)
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: notification.message, id: Date.now() },
      ]);
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, [socket]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) => prevNotifications.filter(n => n.id !== id));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

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
            description={community?.about}
            imageSrc={community?.profileImage}
            location={community?.name}
          />
        ))}
      </div>
      <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-6xl mt-8">Latest Feeds</h1>
      <div className="container mx-auto p-4 mb-4">
        <Slider {...settings}>
          {posts.map((post, index) => (
            <div key={index} className="p-4">
              <div className="bg-white p-4 rounded-lg shadow max-h-screen">
                <div className="flex items-center mb-4">
                  <img src={post.userId.profileImage} alt={post.userId.name} className="w-10 h-10 rounded-full mr-4" />
                  <h3 className="text-lg font-bold">{post.userId.name}</h3>
                </div>
                <img src={post.image} alt="Post" className="w-full h-72 object-cover mb-4 rounded-xl" />
                <p>{post.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Footer />
      <NotificationComponent notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
};

export default HomePage;
