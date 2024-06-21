import React, { useEffect, useState } from 'react';
import user from '../../Interface/user';
import { getProfile } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../Components/UserComponents/PostCard';

const Profile: React.FC = () => {
  const [data, setData] = useState<user>();
  const navigate = useNavigate();

  // Mocked posts data
  const posts = [
    {
      image: '/public/austin-kehmeier-lyiKExA4zQA-unsplash.jpg',
      description: 'This is a description of the first post.',
      postedDate: '2023-06-21',
    },
    {
      image: '/public/austin-kehmeier-lyiKExA4zQA-unsplash.jpg',
      description: 'This is a description of the second post.',
      postedDate: '2023-06-20',
    },
    {
      image: '/public/austin-kehmeier-lyiKExA4zQA-unsplash.jpg',
      description: 'This is a description of the third post.',
      postedDate: '2023-06-19',
    },
    {
      image: '/public/austin-kehmeier-lyiKExA4zQA-unsplash.jpg',
      description: 'This is a description of the fourth post.',
      postedDate: '2023-06-18',
    },
    {
      image: '/public/austin-kehmeier-lyiKExA4zQA-unsplash.jpg',
      description: 'This is a description of the fifth post.',
      postedDate: '2023-06-17',
    },
    {
      image: '/public/austin-kehmeier-lyiKExA4zQA-unsplash.jpg',
      description: 'This is a description of the sixth post.',
      postedDate: '2023-06-16',
    },
  ];

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response: any = await getProfile();
        setData(response?.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchedData();
  }, []);

  return (
    <main className="p-4 mx-auto max-w-screen-xl">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 h-full ">
          <img src={data?.profileImage} alt="Profile" className="w-full h-auto rounded-lg mb-4" />
          <h2 className="text-xl font-semibold">{data?.name}</h2>
          <div className="flex space-x-4 my-2">
            <a href="#" className="text-blue-600"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-blue-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-pink-600"><i className="fab fa-instagram"></i></a>
          </div>
          <p>{data?.email}</p>
          <p>{data?.address}</p>
          <p>{data?.phone}</p>
          <button
            className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg text-gray-900 bg-green-500 focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/editProfile', { state: { data } })}
          >
            Edit profile
          </button>
        </div>
        <div className="flex-grow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-2xl font-semibold">$ {data?.donationsFund}+</h3>
              <p>Donated for Charity</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-2xl font-semibold">0+</h3>
              <p>Essentials Donated</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-2xl font-semibold">0</h3>
              <p>Posts</p>
            </div>
          </div>
          <div className="mt-8 bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
            <i className="fas fa-upload text-6xl"></i>
            <p>Create a new Post</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                image={post.image}
                description={post.description}
                postedDate={post.postedDate}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
