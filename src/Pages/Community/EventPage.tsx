import React from 'react';
import NavBar from '../../Components/CommunityComponents/NavBar';
import Counter from '../../Components/CommunityComponents/Counter';
import ProjectDetails from '../../Components/CommunityComponents/ProjectDetails';
import Footer from '../../Components/Common/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent } from '../../Api/communityApi';

const EventPage: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const handleDelete = async() =>{
        const response = await deleteEvent(id)
        if(response){
            navigate('/community/home')
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
        <Counter />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectDetails />
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Cancel Event</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">Postpone Event</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
