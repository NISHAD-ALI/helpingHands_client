import React, { useEffect, useState } from 'react';
import { getVolunteers } from '../../Api/communityApi';
import { useNavigate } from 'react-router-dom';
import volunteer from '../../Interface/volunteer';

const VolunteerTable: React.FC = () => {
  const [volunteers, setVolunteers] = useState<volunteer[]>([]);
  const [commId, setCommId] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await getVolunteers();
        const res = response?.data?.response;
        if (res) {
          setCommId(response.data.communityId);
          setVolunteers(res.map((vol: any) => vol));
        }
      } catch (error) {
        console.error('Failed to fetch volunteers', error);
      }
    };
    fetchVolunteers();
  }, []);

  const handleChatClick = () => {
    if (commId) {
      navigate(`/community/messages/${commId}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <button
        onClick={handleChatClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Chat with Volunteers
      </button>
      <table className="min-w-full bg-white rounded-md shadow-md mt-4">
        <thead>
          <tr className="bg-green-200 text-left text-sm uppercase text-gray-600">
            <th className="py-3 px-6">SL No</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Events Attended</th>
            <th className="py-3 px-6">Joining Date</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.length > 0 ? (
            volunteers.map((vol, index) => (
              <tr key={vol._id} className="border-b text-sm">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={vol.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {vol.name}
                </td>
                <td className="py-3 px-6">{vol.events.length}</td>
                <td className="py-3 px-6">{'2024-08-23'}</td>
                <td className="py-3 px-6">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-3 px-6 text-center">No volunteers</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerTable;
