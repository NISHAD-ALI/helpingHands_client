import React, { useEffect, useState } from 'react';
import { blockUser, getUsers } from '../../Api/adminApi';
import User from '../../Interface/user';
import UserModal from './UserModal';
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [block,setBlock] = useState(false)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response?.data?.userData);
        setUsers(response?.data?.userData || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [block]);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleBlock = async (id: any) => {
    try {
      const response = await blockUser(id)
      console.log(response)
      setBlock(!block)
    } catch (error) {
      console.error('Failed to block:', error);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">SL No</th>
              <th className="px-4 py-2 border-b"> </th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Amount Donated</th>
              <th className="px-4 py-2 border-b">No. of Essentials Donated</th>
              <th className="px-4 py-2 border-b">Action</th>
              <th className="px-4 py-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="px-4 py-2 border-b">{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.donationsFund}</td>
                  <td className="px-4 py-2 border-b">{user.donationsEssentials}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleBlock(user._id)} 
                      className={`px-4 py-2 rounded text-white ${user.is_blocked ? 'bg-green-500' : 'bg-red-700'
                        }`}
                    >
                      {user.is_blocked ?  'Unblock' : 'Block'}
                    </button>

                  </td>
                  <td className="px-4 py-2 border-b">
                    <button className='text-red-900'
                      onClick={() => handleViewDetails(user)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 border-b text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedUser} />
    </div>
  );
};

export default Users;
