'use client';

import React, { useState } from 'react';
import LoginModal from '../auth/LoginModal';
import MobileSidebar from './MobileSidebar';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 text-sm bg-none hover:bg-gray-200 text-gray-800 rounded-md"
          >
            로그인
          </button>
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

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setIsLoggedIn(true);
            setShowLoginModal(false);
          }}
        />
      )}

      {/* 모바일 사이드바 */}
      {isMenuOpen && (
        <MobileSidebar
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
