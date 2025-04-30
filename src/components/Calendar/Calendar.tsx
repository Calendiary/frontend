'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { themeMap } from '../../styles/calendarTheme';
import { getMonthlySchedules } from  '@/app/api/calendar/route'
import MonthLabel from './MonthLabel';

const daysOfWeek = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

type Schedule = {
  id: number;
  userId: number;
  date: string;
  title: string;
  description: string;
};

const Calendar: React.FC = () => {
  const { theme } = useTheme();
  const current = themeMap[theme];

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );
  const [schedules, setSchedules] = useState<Schedule[]>(
    []
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const fetchSchedules = async () => {
      const data = await getMonthlySchedules(
        year,
        month + 1
      );
      setSchedules(data);
    };
    fetchSchedules();
  }, [year, month]);

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

  const formatDate = (day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  return (
    <div
      className={`relative mt-20 w-full max-w-[1024px] lg:max-w-[calc(100%-15rem)] lg:ml-60 ${current.bg} rounded-b-2xl shadow-md overflow-hidden z-10 ${current.border} mx-auto`}
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
        <MonthLabel year={year} month={month} className={current.text} />

        <button
          onClick={goToNextMonth}
          className={`text-2xl ${current.text} hover:text-black transition`}
        >
          &gt;
        </button>
      </div>

      {/* 요일 */}
      <div
        className={`h-12 grid grid-cols-7 gap-1 ${current.dayBg} text-xs font-semibold ${current.dayText} px-2 sm:px-4 md:px-6`}
      >
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`mt-1 h-10 py-3 text-center ${current.dayInnerBg} rounded`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div
        className={`grid grid-cols-7 gap-1 ${current.header} p-2 sm:p-4 md:p-6 text-sm`}
      >
        {days.map((day, index) => {
          if (!day)
            return (
              <div
                key={index}
                className="h-16 lg:h-24 xl:h-28"
              ></div>
            );

          const dateStr = formatDate(day);
          const daySchedules = schedules.filter(
            (s) => s.date === dateStr
          );

          return (
            <div
              key={index}
              className={`h-16 md:h-20 lg:h-24 xl:h-28 bg-white rounded-xl shadow-sm flex flex-col p-2 ${current.text} cursor-pointer ${current.hover} transition`}
            >
              <span className="font-semibold text-sm">
                {day}
              </span>
              {daySchedules.length > 0 && (
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                  <span className="truncate">
                    {daySchedules[0]?.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
