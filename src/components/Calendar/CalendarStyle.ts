import styled from 'styled-components';

export const CalendarContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 100px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(255, 255, 255);
  overflow: hidden;
  background-color: #fff;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const CalendarNavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  padding: 5px 10px;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  border: none;
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
  height: 60px;
  text-align: left;
  background-color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
