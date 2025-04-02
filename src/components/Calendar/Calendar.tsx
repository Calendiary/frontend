import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme } = useTheme();

  const themeMap = {
    pink: {
      bg: 'bg-pink-50',
      header: 'bg-pink-100',
      border: 'border-pink-200',
      text: 'text-pink-700',
      hover: 'hover:bg-pink-50',
      dayBg: 'bg-pink-200',
      dayText: 'text-pink-700',
      dayInnerBg: 'bg-pink-100',
    },
    blue: {
      bg: 'bg-blue-50',
      header: 'bg-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      hover: 'hover:bg-blue-50',
      dayBg: 'bg-blue-200',
      dayText: 'text-blue-700',
      dayInnerBg: 'bg-blue-100',
    },
    green: {
      bg: 'bg-green-50',
      header: 'bg-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      hover: 'hover:bg-green-50',
      dayBg: 'bg-green-200',
      dayText: 'text-green-700',
      dayInnerBg: 'bg-green-100',
    },
    beige: {
      bg: 'bg-[#F9F5EF]',
      header: 'bg-[#EADDC8]',
      border: 'border-[#D8C7B3]',
      text: 'text-[#5A4C3C]',
      hover: 'hover:bg-[#EFE8DB]',
      dayBg: 'bg-[#EADDC8]',
      dayText: 'text-[#5A4C3C]',
      dayInnerBg: 'bg-[#F1E8DC]',
    },
  };

  const current = themeMap[theme];

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

  const goToPreviousMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div
      className={`relative mt-28 w-full max-w-[1024px] lg:max-w-[calc(100%-15rem)] lg:ml-60 ${current.bg} rounded-2xl shadow-md overflow-hidden z-10 ${current.border} mx-auto`}
    >
      {/* 상단 헤더 */}
      <div
        className={`flex items-center justify-between px-6 py-4 ${current.header} border-b ${current.border}`}
      >
        <button
          onClick={goToPreviousMonth}
          className={`text-2xl ${current.text} hover:text-black transition`}
        >
          &lt;
        </button>
        <h2
          className={`text-lg font-bold ${current.text} tracking-wide`}
        >
          {`${year} ${currentDate.toLocaleString(
            'default',
            { month: 'long' }
          )}`}
        </h2>
        <button
          onClick={goToNextMonth}
          className={`text-2xl ${current.text} hover:text-black transition`}
        >
          &gt;
        </button>
      </div>

      {/* 요일 */}
      <div
        className={`h-8 grid grid-cols-7 gap-1 ${current.dayBg} text-xs font-semibold ${current.dayText} px-2 sm:px-4 md:px-6`}
      >
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`py-2 text-center ${current.dayInnerBg} rounded`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div
        className={`grid grid-cols-7 gap-1 ${current.header} p-2 sm:p-4 md:p-6 text-sm`}
      >
        {days.map((day, index) =>
          day ? (
            <div
              key={index}
              className={`h-16 md:h-20 lg:h-24 xl:h-28 bg-white rounded-xl shadow-sm flex items-start justify-start p-2 ${current.text} cursor-pointer ${current.hover} transition`}
            >
              {day}
            </div>
          ) : (
            <div
              key={index}
              className="h-16 lg:h-24 xl:h-28"
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
