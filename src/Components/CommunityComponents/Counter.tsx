import React, { useEffect, useState } from 'react';

interface CounterProps {
  eventDate: Date;
}

const Counter: React.FC<CounterProps> = ({ eventDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +eventDate - +now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = Object.keys(timeLeft).map((interval, index) => (
    <div key={index} className="text-center mx-2">
      <div className="text-2xl font-bold bg-red-500 rounded-md w-14 h-14 flex items-center justify-center text-white mb-1">
        {(timeLeft as any)[interval]}
      </div>
      <div className="text-sm font-semibold uppercase text-gray-700">{interval}</div>
    </div>
  ));

  return (
    <div className="flex justify-start space-x-4 text-center my-6">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default Counter;
