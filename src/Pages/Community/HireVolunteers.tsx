import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/CommunityComponents/NavBar';
import ApplicationCard from '../../Components/CommunityComponents/ApplicationCard';
import Footer from '../../Components/Common/Footer';
import { getProfile, updateVolunteerStatus } from '../../Api/communityApi'; // Add updateVolunteerStatus function
import { useSelector } from 'react-redux';
import { getVolunteerById } from '../../Api/volunteerApi';
import toast,{Toaster} from 'react-hot-toast';
const HireVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [volunteerIds, setVolunteerIds] = useState([]); 
  const isLoggedIn = useSelector((state: any) => state.auth.communityData );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getProfile();
        if (response) {
          const fetchedVolunteers = response?.data?.data?.volunteers || [];
          setVolunteers(fetchedVolunteers.filter(volunteer => !volunteer.is_accepted));
          const ids = fetchedVolunteers.map((volunteer) => volunteer.volunteerId);
          setVolunteerIds(ids);
        }
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      volunteerIds.forEach(async (volunteerId) => {
        if (!userMap[volunteerId]) {
          try {
            const userResponse = await getVolunteerById(volunteerId);
            setUserMap((prevMap) => ({ ...prevMap, [volunteerId]: userResponse?.data?.data || {} }));
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        }
      });
    };

    fetchUserDetails();
  }, [volunteerIds]);

  const handleAccept = async (volunteerId) => {
    try {
      await updateVolunteerStatus(volunteerId, true);
      const updatedResponse = await getProfile();
      if (updatedResponse) {
        toast.success('Volunteer accepted into community')
        const updatedVolunteers = updatedResponse?.data?.data?.volunteers || [];
        setVolunteers(updatedVolunteers.filter(volunteer => !volunteer.is_accepted));
      }
    } catch (error) {
      console.error("Error accepting volunteer:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto p-4 h-max">
        <h1 className="text-3xl font-bold mb-8">Recent Applications</h1>
        {volunteers.length > 0 ? (
          volunteers.map((volunteer) => (
            <ApplicationCard
              key={volunteer?.id || volunteer?._id}
              name={userMap[volunteer?.volunteerId]?.name || volunteer?.name || volunteer?.volunteerId}
              image={volunteer?.profileImage || userMap[volunteer?.volunteerId]?.profileImage|| "https://via.placeholder.com/150"}
              volunteer={volunteer}
              onAccept={() => handleAccept(volunteer?.volunteerId)}
            />
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </div>
  );
};

export default HireVolunteers;
