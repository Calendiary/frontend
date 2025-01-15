import React from 'react';
import {
  CalendarContainer,
  CalendarHeader,
  CalendarGrid,
  CalendarDay,
} from './CalendarStyle';

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
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // 해당 월의 첫 번째 날짜와 마지막 날짜 계산
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 첫 날 요일 (0: Sun, 1: Mon, ...)
  const lastDateOfMonth = new Date(
    year,
    month + 1,
    0
  ).getDate(); // 마지막 날짜

  // 달력 날짜 배열 생성
  const days: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null), // 첫 주 공백 채우기
    ...Array.from(
      { length: lastDateOfMonth },
      (_, i) => i + 1
    ), // 날짜 채우기
  ];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <h2>
          {`${today.toLocaleString('default', {
            month: 'long',
          })} ${year}`}
        </h2>
      </CalendarHeader>
      <CalendarGrid>
        {/* 요일 헤더 */}
        {daysOfWeek.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}

        {/* 날짜와 빈 칸 렌더링 */}
        {days.map((day, index) =>
          day ? (
            <CalendarDay key={index} className="date">
              {day}
            </CalendarDay>
          ) : (
            <div key={index} className="empty"></div>
          )
        )}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
