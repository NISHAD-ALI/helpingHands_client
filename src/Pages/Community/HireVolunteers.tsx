import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/CommunityComponents/NavBar';
import ApplicationCard from '../../Components/CommunityComponents/ApplicationCard';
import Footer from '../../Components/Common/Footer';
import { getProfile, updateVolunteerStatus } from '../../Api/communityApi';
import { getVolunteerById } from '../../Api/volunteerApi';
import toast, { Toaster } from 'react-hot-toast';
import Volunteer from '../../Interface/volunteer';
import { ClipLoader } from 'react-spinners';

const HireVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: Volunteer }>({});
  const [volunteerIds, setVolunteerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <NavBar bgColor="bg-gray-700" />
      <main className="flex-1 container mx-auto py-10 px-5 lg:px-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Volunteer Applications</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#4A90E2" size={50} />
          </div>
        ) : volunteers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteers.map((volunteer) => {
              const volunteerId = volunteer?.volunteerId;
              if (volunteerId) {
                return (
                  <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white">
                    <ApplicationCard
                      key={volunteer?.id || volunteer?._id}
                      name={userMap[volunteerId]?.name || volunteer?.name || volunteerId}
                      image={volunteer?.profileImage || userMap[volunteerId]?.profileImage || "https://via.placeholder.com/150"}
                      volunteer={volunteer}
                      onAccept={() => handleAccept(volunteerId)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No applications found at the moment.</p>
        )}
      </main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px', borderRadius: '10px', fontSize: '16px' } }} />
    </div>
  );
};

export default HireVolunteers;
