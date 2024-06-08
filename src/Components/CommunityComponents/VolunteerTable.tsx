import React, { useEffect, useState } from 'react';
import { getVolunteers } from '../../Api/communityApi';


const VolunteerTable: React.FC = () => {
    const [volunteers,setVolunteers] = useState([])
    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await getVolunteers();
                const res = response?.data?.response;
                console.log(res)
                if (res) {
                    const volunteerDetails = res.map((vol: any) => vol);
                    setVolunteers(volunteerDetails);
                }
            } catch (error) {
                console.error('Failed to fetch volunteers', error);
            }
        };
        fetchVolunteers();
    }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="bg-green-200 text-left text-sm uppercase text-gray-600">
            <th className="py-3 px-6">SL No</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Events attended</th>
            <th className="py-3 px-6">Joining Date</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer, index) => (
            <tr key={volunteer.id} className="border-b text-sm">
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6 flex items-center">
                <img src={volunteer.profileImage} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                {volunteer.name}
              </td>
              <td className="py-3 px-6">{volunteer.eventsAttended}</td>
              <td className="py-3 px-6">{volunteer.joiningDate || '12-02-2024'}</td>
              <td className="py-3 px-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerTable;
