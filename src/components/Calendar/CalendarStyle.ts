import styled from 'styled-components';

export const CalendarContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
`;

export const CalendarHeader = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  text-align: center;
  border-bottom: 1px solid #ddd;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #ddd;

  .day-name {
    padding: 10px;
    background-color: #f5f5f5;
    text-align: center;
    font-weight: bold;
    color: #666;
  }

  .empty {
    background-color: #fff;
  }
`;

export const CalendarDay = styled.div`
  padding: 15px;
  text-align: center;
  background-color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
