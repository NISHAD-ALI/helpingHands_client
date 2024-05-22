import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16 bg-gray-100">
      <h1 className="text-4xl font-bold">The Green Corps</h1>
      <p className="text-xl mt-2">since 2022</p>
      <div className="flex justify-center mt-8 space-x-4">
        {["Support", "Education", "Volunteers", "Donations"].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{item}</h2>
            <p className="text-gray-600 mt-2">When deciding which charity to donate to, it's important to do your research.</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-8 text-center">
        <div>
          <h3 className="text-2xl font-bold">12+</h3>
          <p className="text-gray-600">Years of Experience</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">140+</h3>
          <p className="text-gray-600">Volunteers</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">500+</h3>
          <p className="text-gray-600">Worldwide Offices</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
