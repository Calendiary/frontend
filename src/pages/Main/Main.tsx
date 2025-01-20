import React, { useState, useEffect } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Header/Header';
import LoginModal from '../../Modal/LoginModal/LoginModal';
import { isLoggedIn } from '../../auth/utils/authUtils';

const Main: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    setLoggedIn(isLoggedIn()); // 컴포넌트 마운트 시 로그인 상태 확인
  }, []);

  return (
    <div>
      {!loggedIn && <LoginModal />}
      <Header />
      <Calendar />
    </div>
  );
};

export default Main;
