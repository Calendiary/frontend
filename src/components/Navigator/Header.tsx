'use client';
import React, { useState } from 'react';
import LoginModal from '../Modal/LoginModal';
import MobileSidebar from './MobileSidebar';
import NicknameModal from '../Modal/NicknameModal';
import { useAuthUser } from '@/hooks/userAuthUser';

const Header: React.FC = () => {
  const {
    user,
    isLoggedIn,
    showNicknameModal,
    setShowNicknameModal,
    logout,
  } = useAuthUser();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[80px] bg-white shadow-md z-[1000] flex items-center justify-between px-6">
        <h1 onClick={() => setIsMenuOpen(true)} className="text-xl font-bold text-gray-800 cursor-pointer lg:cursor-default">
          Calendiary
        </h1>

        {!isLoggedIn ? (
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 text-sm bg-none hover:bg-gray-200 text-gray-800 rounded-md"
          >
            로그인
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="프로필" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                {user?.nickname?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium hidden md:block">{user?.nickname}</span>
            <button onClick={logout} className="text-sm text-gray-600 hover:underline">로그아웃</button>
          </div>
        )}
      </header>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onSuccess={() => window.location.reload()} />
      )}

      {isMenuOpen && <MobileSidebar onClose={() => setIsMenuOpen(false)} />}

      {showNicknameModal && (
        <NicknameModal
          onClose={() => setShowNicknameModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </>
  );
};

export default Header;
