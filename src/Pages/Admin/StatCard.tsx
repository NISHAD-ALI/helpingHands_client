import React, { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode; 
  label: string;
  value: string | number; 
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, bgColor }) => {
  return (
    <div className={`flex items-center p-4 bg-white shadow rounded-lg ${bgColor}`}>
      <div className="w-12 h-12 flex items-center justify-center bg-opacity-25 rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <h2 className="text-gray-500 text-sm font-medium">{label}</h2>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
