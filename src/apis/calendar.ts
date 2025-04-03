// src/apis/calendar.ts
import axios from 'axios';

export const getMonthlySchedules = async (
  year: number,
  month: number
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const monthStr = String(month).padStart(2, '0');
  const start = `${year}-${monthStr}-01`;
  const end = `${year}-${monthStr}-31`;

  const response = await axios.get(
    `${apiUrl}/schedules?date_gte=${start}&date_lte=${end}`
  );
  return response.data;
};
