import React, { useState } from 'react';

const daysOfWeek = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from(
      { length: lastDateOfMonth },
      (_, i) => i + 1
    ),
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 mt-[110px] w-full max-w-[600px] rounded-lg shadow-lg bg-white overflow-hidden z-10">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
        <button
          onClick={goToPreviousMonth}
          className="text-xl px-2 hover:text-blue-500 transition-colors"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {`${year} ${currentDate.toLocaleString(
            'default',
            {
              month: 'long',
            }
          )}`}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-xl px-2 hover:text-blue-500 transition-colors"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-300 text-sm">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="py-2 bg-gray-100 text-center font-bold text-gray-600"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) =>
          day ? (
            <div
              key={index}
              className="h-[60px] p-3 bg-white text-left cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {day}
            </div>
          ) : (
            <div
              key={index}
              className="h-[60px] bg-white"
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
