'use client';

import React, { useState } from 'react';
import LoginModal from '../Modal/LoginModal'; // 수정된 LoginModal 임포트
import MobileSidebar from './MobileSidebar';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // 로그인과 회원가입을 구분하는 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[80px] bg-white shadow-md z-[1000] flex items-center justify-between px-6">
        {/* 로고 (모바일에서는 클릭 가능) */}
        <h1
          onClick={() => setIsMenuOpen(true)}
          className="text-xl font-bold text-gray-800 cursor-pointer lg:cursor-default"
        >
          Calendiary
        </h1>

        {/* 로그인 / 프로필 */}
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => { setIsSignUp(false); setShowLoginModal(true); }} // 로그인 버튼 클릭 시
              className="px-4 py-2 text-sm bg-none hover:bg-gray-200 text-gray-800 rounded-md"
            >
              로그인
            </button>
            <button
              onClick={() => { setIsSignUp(true); setShowLoginModal(true); }} // 회원가입 버튼 클릭 시
              className="px-4 py-2 text-sm bg-none hover:bg-gray-200 text-gray-800 rounded-md"
            >
              회원가입
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/32"
              alt="프로필"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-sm text-gray-600 hover:underline"
            >
              로그아웃
            </button>
          </div>
        )}
      </header>

      {/* 로그인 / 회원가입 모달 */}
      {showLoginModal && (
        <LoginModal
          isSignUp={isSignUp}  // isSignUp 값을 전달
          setIsSignUp={setIsSignUp} // setIsSignUp 값을 전달
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setIsLoggedIn(true);  // 로그인 성공 시
            setShowLoginModal(false);
          }}
        />
      )}

      {/* 모바일 사이드바 */}
      {isMenuOpen && (
        <MobileSidebar onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;
