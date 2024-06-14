import React, { useEffect, useState } from 'react';
import { getCommunities } from '../../Api/adminApi';

import communityModal from './communityModal';


const Communities: React.FC = () => {
  const [communities, setCommunities] = useState();
//   const [selectedcommunity, setSelectedcommunity] = useState<community | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  const [block,setBlock] = useState(false)


  useEffect(() => {

    const fetchComminities = async () => {
      try {
        const response = await getCommunities();
        console.log(response?.data?.communities);
        setCommunities(response?.data?.communities || []);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      }
    };
    fetchComminities();
  }, [block]);

//   const handleViewDetails = (community: community) => {
//     setSelectedcommunity(community);
//     setIsModalOpen(true);
//   };


  const handleBlock = async (id: any) => {
    try {
    //   const response = await blockcommunity(id)
    //   console.log(response)
    //   setBlock(!block)
    } catch (error) {
      console.error('Failed to block:', error);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Communities</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">SL No</th>
              <th className="px-4 py-2 border-b"></th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">No. of Volunteers</th>
              <th className="px-4 py-2 border-b">Action</th>
              <th className="px-4 py-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {communities?.length > 0 ? (
              communities?.map((community, index) => (
                <tr key={community._id} className="text-center">
                  <td className="px-4 py-2 border-b">{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    <img src={community.profileImage} alt={community.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-4 py-2 border-b">{community.name}</td>
                  <td className="px-4 py-2 border-b">{community.phone}</td>
                  <td className="px-4 py-2 border-b">{community.volunteers.length}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleBlock(community._id)} 
                      className={`px-4 py-2 rounded text-white ${community.is_blocked ? 'bg-green-500' : 'bg-red-700'
                        }`}
                    >
                      {community.is_blocked ?  'Unblock' : 'Block'}
                    </button>

                  </td>
                  <td className="px-4 py-2 border-b">
                    {/* <button
                      onClick={() => handleViewDetails(community)}
                    >
                      View Details
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 border-b text-center">No communities found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <communityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} community={selectedcommunity} /> */}
    </div>
  );
};

export default Communities;
