import React, { useState } from 'react';
import { signUpUser, loginUser } from '@/app/api/auth'; // signUpUser 함수 import
import { AxiosError } from 'axios';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
  isSignUp: boolean;  // 로그인/회원가입을 구분하는 props 추가
  setIsSignUp: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess, isSignUp, setIsSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        // 회원가입 처리
        const newUser = await signUpUser(name, email, password);
        console.log('회원가입 성공:', newUser);
        setIsSignUp(false); // 회원가입 후 로그인 화면으로 전환
        alert('회원가입 성공! 로그인 화면으로 전환됩니다.');
      } else {
        // 로그인 처리
        const user = await loginUser(email, password);
        console.log('로그인 성공:', user);
        onSuccess();  // 로그인 성공 시 onSuccess 호출
        alert('로그인 성공!');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError가 발생한 경우
        alert(`API 호출 실패: ${error.response?.data?.message || error.message}`);
      } else if (error instanceof Error) {
        // 일반 Error 처리
        alert(`오류 발생: ${error.message}`);
      } else {
        // 알 수 없는 오류 처리
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
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
          {isSignUp ? '회원가입' : '로그인'}
        </h2>

        {/* 입력 폼 */}
        {isSignUp && (
          <input
            type="text"
            placeholder="이름"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm text-black"
            value={name}
            onChange={(e) => setName(e.target.value)} // 이름 입력
          />
        )}
        <input
          type="text"
          placeholder="이메일"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm  text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm  text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm mb-4"
        >
          {isSignUp ? '회원가입' : '로그인'}
        </button>

        {/* 로그인 / 회원가입 전환 링크 */}
        <div className="text-sm text-gray-500 text-center mb-4">
          {isSignUp ? (
            <>
              이미 계정이 있으신가요?{' '}
              <span
                onClick={() => setIsSignUp(false)} // 로그인 화면으로 전환
                className="text-blue-600 cursor-pointer hover:underline"
              >
                로그인
              </span>
            </>
          ) : (
            <>
              아직 계정이 없으신가요?{' '}
              <span
                onClick={() => setIsSignUp(true)} // 회원가입 화면으로 전환
                className="text-blue-600 cursor-pointer hover:underline"
              >
                회원가입
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
