import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../Components/VolunteerComponents/NavBar';
import Footer from '../../Components/Common/Footer';
import { enrollToComm, getCommunityDetails, getProfileVolunteer } from '../../Api/volunteerApi';
import { useSelector } from 'react-redux';

interface Community {
    id: string;
    name: string;
    description: string;
    profileImage: string;
    activeVolunteers: number;
    hoursSpent: number;
}

const CommunityPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [community, setCommunity] = useState<Community | null>(null);
    const [volunteer,setVolunteer] = useState('')
    const [enroll,setEnroll] = useState(false)
    useEffect(() => {
        const fetchCommunityDetails = async () => {
            console.log(id)
            const response = await getCommunityDetails(id);
            const responseVolunteer = await getProfileVolunteer()
            console.log(responseVolunteer?.data)
            console.log(response?.data?.updated)
            setCommunity(response?.data?.updated);
            setVolunteer(responseVolunteer?.data?.data)
        };
        fetchCommunityDetails();
    }, [id]);
    const handleEnroll = async () => {
        console.log(id)
        console.log(volunteer._id+"-----")
        const response = await enrollToComm(id,volunteer._id)
        console.log(response.data.data+'hooooi')
        if(response.data.data){
            setEnroll(true)
        }
    };
    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar />
            <div className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">{community?.name}</h1>
                        <p className="text-gray-500">since 2022</p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={community?.profileImage || '/path/to/default/image.jpg'}
                                alt={community?.name}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">About our community:</h2>
                            <p className="text-gray-700">{community?.description}</p>
                            <div className="mt-4">
                                <p className="text-lg font-semibold">Phone Number : {community?.phone}</p>
                                <p className="text-lg font-semibold">No.of events conducted: {community?.events.length}</p>
                            </div>
                           {enroll ? <button className="mt-6 px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600" onClick={handleEnroll}>
                                  Enrolled
                            </button> : <button className="mt-6 px-6 py-2 bg-green-700 text-white font-bold rounded-full hover:bg-green-600" onClick={handleEnroll}>
                            Enroll Now
                            </button> } 
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CommunityPage;
