import React, { useEffect, useState } from 'react';
import { getDonations, closeDonation } from '../../Api/adminApi'; // Make sure closeDonation is imported
import donations from '../../Interface/donations';

const Donations: React.FC = () => {
  const [donations, setDonations] = useState<donations[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonations();
        if (response?.data?.donations) {
          console.log(response.data.donations);
          setDonations(response.data.donations);
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };
    fetchDonations();
  }, []);

  const handleCloseDonation = async (id: string) => {
    try {
      await closeDonation(id);
      setDonations(prevDonations => prevDonations.filter(donation => donation._id !== id));
    } catch (error) {
      console.error('Failed to close donation:', error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">SL No</th>
              <th className="px-4 py-2 border-b">Banner</th>
              <th className="px-4 py-2 border-b">Name of Fundraiser</th>
              <th className="px-4 py-2 border-b">Progress</th>
              <th className="px-4 py-2 border-b">Amount Raised</th>
              <th className="px-4 py-2 border-b">Target Amount</th>
              <th className="px-4 py-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation, index) => {
                const amountCollected = donation.amountCollected ?? 0;
                const targetAmount = donation.targetAmount ?? 1;
                const progress = (amountCollected / targetAmount) * 100;
                
                return (
                  <tr key={donation._id} className="text-center">
                    <td className="px-4 py-2 border-b">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <img
                        src={donation.image}
                        alt={donation.name}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{donation.name}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-gray-800 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b">{amountCollected}</td>
                    <td className="px-4 py-2 border-b">{targetAmount}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="bg-red-700 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleCloseDonation(donation._id as string)}
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 border-b text-center">
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;
