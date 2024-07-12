import React, { useEffect, useState } from 'react';
import { blockCommunity, getCommunities } from '../../Api/adminApi';
import CommunityModal from './CommunityModal';
import Community from '../../Interface/community';
const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await getCommunities();
        setCommunities(response?.data?.communities || []);
      } catch (err) {
        setError('Failed to fetch communities');
        console.error('Failed to fetch communities:', err);
      }
    };

    fetchCommunities();
  }, [block]);

  const handleBlock = async (id: string) => {
    try {
      await blockCommunity(id);
      setBlock(!block);
    } catch (err) {
      setError('Failed to block/unblock community');
      console.error('Failed to block/unblock community:', err);
    }
  };

  const handleViewDetails = (community: Community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Communities</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
              <th className="px-4 py-2 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {communities.length > 0 ? (
              communities.map((community, index) => (
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
                      className={`px-4 py-2 rounded text-white ${community.is_blocked ? 'bg-green-500' : 'bg-red-700'}`}
                    >
                      {community.is_blocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleViewDetails(community)}
                      className="px-4 py-2 text-red-900 rounded"
                    >
                      View Details
                    </button>
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
      <CommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} community={selectedCommunity} />
    </div>
  );
};

export default Communities;
