import React, { useEffect, useState } from 'react';
import Nav from '../../Components/UserComponents/Nav';
import FundraiserCard from '../../Components/UserComponents/FundraiserCard';
import Footer from '../../Components/UserComponents/Footer';
import donations from '../../Interface/donations';
import { getDonations } from '../../Api/adminApi';
import ScrollToTop from '../../Components/Common/ScrollToTop';

const Fundraiser: React.FC = () => {
  const [fundraiser, setFundraiser] = useState<donations[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonations();
        if (response?.data?.donations) {
          console.log(response.data.donations);
          setFundraiser(response.data.donations);
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="bg-gradient-to-br from-teal-50 to-green-200 font-inter min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Fundraiser</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fundraiser.map((fundraiser, index) => {
            const amountCollected = fundraiser.amountCollected ?? 0;
            const targetAmount = fundraiser.targetAmount ?? 1;
            const progress = Math.round((amountCollected / targetAmount) * 100);

            return (
              <FundraiserCard
                key={index}
                category={fundraiser.type}
                image={fundraiser.image}
                progress={progress}
                name={fundraiser.name}
                details={fundraiser.details}
                _id={fundraiser._id as string}
              />
            );
          })}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Fundraiser;
