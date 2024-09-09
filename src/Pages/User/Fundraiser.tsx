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
          setFundraiser(response.data.donations);
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="bg-gray-50 font-inter min-h-screen flex flex-col">
      <Nav />
      
      <header className="bg-gradient-to-r from-green-300 to-teal-500 text-white py-12 text-center">
        <h1 className="text-5xl font-extrabold">Support Our $10 Fundraisers</h1>
        <p className="text-lg mt-4">Empower communities by contributing to campaigns that bring real change.</p>
      </header>

      <main className="flex-1 container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
