import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Header/Header';
import LoginModal from '../../Modal/LoginModal/LoginModal';

const Main: React.FC = () => {
  return (
    <div>
      <LoginModal />
      <Header />
      <Calendar />{' '}
    </div>
  );
};

export default Main;
