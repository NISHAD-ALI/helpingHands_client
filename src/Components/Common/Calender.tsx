import React, { useState } from 'react';
import {
  addMonths,
  subMonths,
  format,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  endOfMonth,
  endOfWeek,
  startOfMonth
} from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CalendarProps {
  events: any[];
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-2 rounded-lg">
        <button onClick={prevMonth} className="text-gray-600">
          <FiChevronLeft />
        </button>
        <span className="text-lg font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button onClick={nextMonth} className="text-gray-600">
          <FiChevronRight />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-gray-600" key={i}>
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfWeek(startOfMonth(currentMonth));
    const monthEnd = endOfWeek(endOfMonth(currentMonth));
    const startDate = monthStart;
    const endDate = monthEnd;
  
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const hasEvent = events && events.length > 0 && events.some(event =>
          event.shifts.some(shift => new Date(shift.date).toDateString() === day.toDateString())
        );
        days.push(
          <div
            className={`p-2 text-center cursor-pointer ${
              !isSameMonth(day, currentMonth)
                ? 'text-gray-400'
                : isSameDay(day, selectedDate)
                ? 'bg-blue-500 text-white rounded-full'
                : 'text-gray-800'
            } ${hasEvent ? 'border-2 border-red-500 rounded-full' : ''}`}
            key={day.toString()}
            onClick={() => {
              setSelectedDate(day);
              onDateClick(cloneDay);
            }}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };
  
  

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto mt-10">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
