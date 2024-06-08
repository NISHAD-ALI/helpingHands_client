import React from 'react';
import { FaHandshake, FaUsers, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const features = [
  {
    title: 'Build the team',
    description: ' Specially designed for the peoples and NGOs who need special support and attention.',
    image: 'public/hannah-busing-Zyx1bK9mqmA-unsplash.jpg', 
    icon: FaUsers,
  },
  {
    title: 'Hire Volunteers',
    description: ' Hire volunteers with our technology.',
    image: 'public/cytonn-photography-n95VMLxqM2I-unsplash.jpg', 
    icon: FaHandshake,
  },
  {
    title: 'Make the world better',
    description: 'We always provide useful information to make it easier for you every day.',
    image: 'public/dani-guitarra-7JbUsmYPwP8-unsplash.jpg', 
    icon: FaHeart,
  },
];

const Features: React.FC = () => {
    const navigate = useNavigate()
  return (
    <section className="py-16bg-gradient-to-br from-teal-50 to-green-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Our Features you can get</h2>
        <p className="text-lg">We offer a variety of interesting features that can can help you change the perpective of social service</p>
        <button className="bg-green-500 text-white px-6 py-3 rounded mt-4" onClick={()=>navigate('/community/login')}>Get Started</button>
      </div>
      <div className="flex justify-center space-x-4">
        {features.map((feature, index) => (
          <div key={index} className="max-w-sm bg-white shadow-md rounded overflow-hidden">
            <img src={feature.image} alt={feature.title} className="w-full h-72 object-cover"/> {/* Increased height */}
            <div className="p-4">
              <feature.icon className="text-green-500 text-3xl mb-4"/>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
