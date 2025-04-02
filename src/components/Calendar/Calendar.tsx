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
    <div className="fixed left-1/2 -translate-x-1/2 mt-28 w-full max-w-[600px] bg-pink-50 rounded-2xl shadow-md overflow-hidden z-10 border border-pink-200">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-6 py-4 bg-pink-100 border-b border-pink-200">
        <button
          onClick={goToPreviousMonth}
          className="text-2xl text-pink-500 hover:text-pink-700 transition"
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold text-pink-700 tracking-wide">
          {`${year} ${currentDate.toLocaleString(
            'default',
            {
              month: 'long',
            }
          )}`}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-2xl text-pink-500 hover:text-pink-700 transition"
        >
          &gt;
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 gap-1 bg-pink-200 text-xs font-semibold text-pink-700">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="py-2 text-center bg-pink-100 rounded"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-1 bg-pink-100 p-2 text-sm">
        {days.map((day, index) =>
          day ? (
            <div
              key={index}
              className="h-16 bg-white rounded-xl shadow-sm flex items-start justify-start p-2 text-pink-700 cursor-pointer hover:bg-pink-50 transition"
            >
              {day}
            </div>
          ) : (
            <div key={index} className="h-16"></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
