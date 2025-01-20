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
        console.log('Kakao Authorization Code:', code);

        try {
          // 백엔드로 인증 코드 전송
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/auth/kakao`,
            { code }
          );
          console.log('Server Response:', response.data);

          const { userId, nickname, profileImage } =
            response.data;

          console.log('로그인 성공:', response.data);

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
      } else {
        console.error('카카오 인증 코드가 없습니다.');
        navigate('/'); // 인증 코드가 없을 경우 메인으로
      }
    };

    handleKakaoAuth();
  }, [navigate]);

  return <h2>카카오 로그인 처리 중...</h2>;
};

export default KakaoCallback;
