import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/CommunityComponents/NavBar';
import ApplicationCard from '../../Components/CommunityComponents/ApplicationCard';
import Footer from '../../Components/Common/Footer';
import { getProfile, updateVolunteerStatus } from '../../Api/communityApi';
import { getVolunteerById } from '../../Api/volunteerApi';
import toast, { Toaster } from 'react-hot-toast';
import Volunteer from '../../Interface/volunteer';

const HireVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: Volunteer }>({});
  const [volunteerIds, setVolunteerIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getProfile();
        if (response) {
          const fetchedVolunteers: Volunteer[] = response?.data?.data?.volunteers || [];
          setVolunteers(fetchedVolunteers.filter((volunteer: Volunteer) => !volunteer.is_accepted));
          const ids = fetchedVolunteers.map((volunteer: Volunteer) => volunteer.volunteerId);
          setVolunteerIds(ids as any);
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
  }, [volunteerIds, userMap]);

  const handleAccept = async (volunteerId: string) => {
    try {
      await updateVolunteerStatus(volunteerId, true);
      const updatedResponse = await getProfile();
      if (updatedResponse) {
        toast.success('Volunteer accepted into community');
        const updatedVolunteers = updatedResponse?.data?.data?.volunteers || [];
        setVolunteers(updatedVolunteers.filter((volunteer: Volunteer) => !volunteer.is_accepted));
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
          volunteers.map((volunteer) => {
            const volunteerId = volunteer?.volunteerId;
            if (volunteerId) {
              return (
                <ApplicationCard
                  key={volunteer?.id || volunteer?._id}
                  name={userMap[volunteerId]?.name || volunteer?.name || volunteerId}
                  image={volunteer?.profileImage || userMap[volunteerId]?.profileImage || "https://via.placeholder.com/150"}
                  volunteer={volunteer}
                  onAccept={() => handleAccept(volunteerId)}
                />
              );
            }
            return null;
          })
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
