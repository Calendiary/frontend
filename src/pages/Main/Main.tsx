import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Header/Header';
import LoginModal from '../../Modal/LoginModal/LoginModal';
import { isLoggedIn } from '../../auth/utils/authUtils';

const Main: React.FC = () => {
  return (
    <div>
      {isLoggedIn() ? <LoginModal /> : <></>}
      <Header />
      <Calendar />
    </div>
  );
};

export default Main;
