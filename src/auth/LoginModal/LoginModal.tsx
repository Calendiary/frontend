import React from 'react';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const KAKAO_CLIENT_ID =
    process.env.REACT_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div className="bg-white w-[90%] max-w-[400px] p-6 rounded-xl shadow-lg relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        {/* 제목 */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          로그인
        </h2>

        {/* 입력 폼 */}
        <input
          type="text"
          placeholder="이메일 또는 아이디"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm mb-4"
          onClick={() => {
            onSuccess(); // 로그인 성공 처리
          }}
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <div className="text-sm text-gray-500 text-center mb-4">
          아직 계정이 없으신가요?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            회원가입
          </span>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* 카카오 로그인 */}
        <button
          onClick={handleKakaoLogin}
          className="w-full bg-[#F7E600] text-black rounded-md py-2 text-sm font-medium hover:bg-[#F9E000] transition-colors"
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
