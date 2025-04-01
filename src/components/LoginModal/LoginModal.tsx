import React from 'react';

const LoginModal: React.FC = () => {
  const KAKAO_CLIENT_ID =
    process.env.REACT_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div className="bg-white w-[90%] max-w-[400px] p-5 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">
          로그인이 필요합니다
        </h2>
        <button
          onClick={handleKakaoLogin}
          className="w-full bg-[#F7E600] text-black rounded px-4 py-2 text-base font-medium hover:bg-[#F9E000] transition-colors"
        >
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
