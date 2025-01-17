import React from 'react';
import {
  ModalBackground,
  ModalContent,
  KakaoButton,
} from './LoginModalStyle';

const LoginModal: React.FC = () => {
  const KAKAO_CLIENT_ID =
    process.env.REACT_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <ModalBackground>
      <ModalContent>
        <h2>로그인이 필요합니다</h2>
        <KakaoButton onClick={handleKakaoLogin}>
          카카오 로그인
        </KakaoButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default LoginModal;
