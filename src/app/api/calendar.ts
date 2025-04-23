// src/apis/calendar.ts
import axios from 'axios';

type Schedule = {
  id: number;
  userId: number;
  date: string;
  title: string;
  description: string;
};

export const getMonthlySchedules = async (
  year: number,
  month: number
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.get(`${apiUrl}/schedules`);

  const monthStr = String(month).padStart(2, '0');

  const data = response.data.filter((schedule: Schedule) => {
    return schedule.date.startsWith(`${year}-${monthStr}`);
  });

  console.log('✅ 필터링된 데이터:', data);
  return data;
};

