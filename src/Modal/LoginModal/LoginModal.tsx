import React from 'react';
import {
  ModalBackground,
  ModalContent,
  KakaoButton,
} from './LoginModalStyle';

const LoginModal: React.FC = () => {
  return (
    <ModalBackground>
      <ModalContent>
        <h2>로그인이 필요합니다</h2>
        <KakaoButton>카카오 로그인</KakaoButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default LoginModal;
