import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoAuth = async () => {
      const params = new URLSearchParams(
        window.location.search
      );
      const code = params.get('code'); // 카카오에서 받은 인증 코드

      if (code) {
        try {
          // 백엔드로 인증 코드 전송
          const response = await axios.post(
            'http://localhost:8080/api/auth/kakao',
            { code }
          );
          const { userId, nickname, profileImage } =
            response.data;

          // 로컬 스토리지에 저장
          localStorage.setItem('userId', userId);
          localStorage.setItem('nickname', nickname);
          localStorage.setItem(
            'profileImage',
            profileImage
          );

          // 메인 페이지로 리다이렉트
          navigate('/');
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
          navigate('/'); // 실패 시 메인으로 돌아감
        }
      }
    };

    handleKakaoAuth();
  }, [navigate]);

  return <h2>카카오 로그인 처리 중...</h2>;
};

export default KakaoCallback;
