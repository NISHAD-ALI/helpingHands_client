import React from 'react';
import { FaHandshake, FaUsers, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Build the team',
    description: 'Build a community that ignites connection, compassion, and transformation.',
    image: './hannah-busing-Zyx1bK9mqmA-unsplash.jpg',
    icon: FaUsers,
  },
  {
    title: 'Hire Volunteers',
    description: 'Hire volunteers who meet your community ethics with our technology.',
    image: './cytonn-photography-n95VMLxqM2I-unsplash.jpg',
    icon: FaHandshake,
  },
  {
    title: 'Make the world better',
    description: 'Empower others and unite to create a better world.',
    image: './dani-guitarra-7JbUsmYPwP8-unsplash.jpg',
    icon: FaHeart,
  },
];

const Features: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-green-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Features</h2>
          <p className="text-lg mb-6">We offer a variety of interesting features that can help change the perspective of social service.</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300" onClick={() => navigate('/community/login')}>Get Started</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={feature.image} alt={feature.title} className="w-full h-60 object-cover" />
              <div className="p-6">
                <feature.icon className="text-green-500 text-3xl mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
