'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  id: string;
  nickname: string;
  profileImage: string | null;
  email: string | null;
}

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (userData: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 카카오 로그인 설정
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || `${window.location.origin}/api/auth/kakao/callback`;
  
  // 카카오에서 리다이렉트 후 처리
  useEffect(() => {
    // 카카오 로그인 콜백 처리
    const code = searchParams.get('code');
    if (code) {
      // 코드를 받았으면 서버에 인증 요청
      handleKakaoCallback(code);
    }
  }, [searchParams]);
  
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };
  
  const handleKakaoCallback = async (code: string) => {
    try {
      // 서버에 인증 코드 전송
      const response = await fetch('/api/auth/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // 사용자 정보를 로컬스토리지나 상태에 저장
        localStorage.setItem('user', JSON.stringify(data.user));
        // 로그인 성공 처리
        onSuccess(data.user);
        // 홈으로 리다이렉트
        router.push('/');
      } else {
        console.error('카카오 로그인 실패');
      }
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류:', error);
    }
  };
  
  // 모달 외부 클릭 시 닫기
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">로그인</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={handleKakaoLogin}
            className="flex items-center justify-center w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors"
          >
            <div className="flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.03 4 3 7.13 3 11C3 13.41 4.56 15.52 6.99 16.74V20L10.45 17.64C10.96 17.71 11.47 17.75 12 17.75C16.97 17.75 21 14.62 21 10.75C21 6.88 16.97 4 12 4Z" fill="black"/>
              </svg>
              <span className="ml-2">카카오 로그인</span>
            </div>
          </button>
          
          {/* 추가 로그인 옵션 */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>아직 회원이 아니신가요? <button className="text-blue-600 hover:underline">회원가입</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;