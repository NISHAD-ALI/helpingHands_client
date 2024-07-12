import React from 'react';
import { FaHandshake, FaUsers, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Build the team',
    description: 'Specially designed for the people and NGOs who need special support and attention.',
    image: '/hannah-busing-Zyx1bK9mqmA-unsplash.jpg',
    icon: FaUsers,
  },
  {
    title: 'Hire Volunteers',
    description: 'Hire volunteers with our technology.',
    image: '/cytonn-photography-n95VMLxqM2I-unsplash.jpg',
    icon: FaHandshake,
  },
  {
    title: 'Make the world better',
    description: 'We always provide useful information to make it easier for you every day.',
    image: '/dani-guitarra-7JbUsmYPwP8-unsplash.jpg',
    icon: FaHeart,
  },
];

const Features: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-green-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold">Our Features</h2>
          <p className="text-lg">We offer a variety of interesting features that can help change the perspective of social service.</p>
          <button className="bg-green-500 text-white px-6 py-3 rounded mt-4" onClick={() => navigate('/community/login')}>Get Started</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md rounded overflow-hidden">
              <img src={feature.image} alt={feature.title} className="w-full h-72 object-cover" />
              <div className="p-4">
                <feature.icon className="text-green-500 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
