'use client';
import React from 'react';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void; // 필요 없어도 일관성을 위해 유지
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const startKakaoLogin = () => {
    const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">로그인</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <button
          onClick={startKakaoLogin}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-3 px-4 rounded-md"
        >
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
