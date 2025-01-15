import React, { useState } from 'react';
import {
  CalendarContainer,
  CalendarHeader,
  CalendarGrid,
  CalendarDay,
  CalendarNavButton,
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
  // 현재 연도와 월을 상태로 관리
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 해당 월의 첫 번째 날짜와 마지막 날짜 계산
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  // 달력 날짜 배열 생성
  const days: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null), // 첫 주 공백 채우기
    ...Array.from(
      { length: lastDateOfMonth },
      (_, i) => i + 1
    ), // 날짜 채우기
  ];

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarNavButton onClick={goToPreviousMonth}>
          &lt;
        </CalendarNavButton>
        <h2>
          {`${year} ${currentDate.toLocaleString(
            'default',
            {
              month: 'long',
            }
          )} `}
        </h2>
        <CalendarNavButton onClick={goToNextMonth}>
          &gt;
        </CalendarNavButton>
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
