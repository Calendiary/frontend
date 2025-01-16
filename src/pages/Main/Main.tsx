import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Header/Header';
const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <Calendar />{' '}
    </div>
  );
};

export default Main;
