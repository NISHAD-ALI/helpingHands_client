import React from 'react';

const LatestFeeds: React.FC = () => {
  return (
    <section className="py-16 ">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Feeds</h2>
      <div className="flex justify-around">
        <div className="max-w-sm h-96 bg-white shadow-md p-4 rounded">
          <img src="public/50 Community Service Ideas.jpg" alt="Los Angeles, California" className="w-full h-64 object-cover rounded mb-4" />
          <h3 className="text-xl font-bold mb-2">Los Angeles, California</h3>
          <p>A group of young volunteers from an organization dedicated to conservation.</p>
        </div>
        <div className="max-w-sm bg-white shadow-md p-4 rounded">
          <img src="public/joel-muniz-A4Ax1ApccfA-unsplash.jpg" alt="Gaza Strip, Palestine" className="w-full h-64 object-cover rounded mb-4" />
          <h3 className="text-xl font-bold mb-2">Gaza Strip, Palestine</h3>
          <p>In a remarkable display of environmental stewardship, a group of young volunteers.</p>
        </div>
        <div className="max-w-sm bg-white shadow-md p-4 rounded">
          <img src="public/Quelles sont les conditions pour obtenir une aide à domicile _.jpg" alt="Kerala, India" className="w-full h-64 object-cover rounded mb-4" />
          <h3 className="text-xl font-bold mb-2">Kerala, India</h3>
          <p>A remarkable display of environmental stewardship, a group of young volunteers.</p>
        </div>
      </div>
    </section>
  );
};

export default LatestFeeds;
