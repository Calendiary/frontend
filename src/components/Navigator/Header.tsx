'use client';
import React, { useState, useEffect } from 'react';
import LoginModal from '../Modal/LoginModal';
import MobileSidebar from './MobileSidebar';

interface User {
  id: string;
  nickname: string;
  profileImage: string | null;
  email: string | null;
}

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 로그인 상태 체크
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        localStorage.removeItem('user'); // 잘못된 정보는 삭제
      }
    }
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 삭제
    setUser(null); // 상태 초기화
    setIsLoggedIn(false); // 로그인 상태 변경
  };

  // 로그인 성공 처리
  const handleLoginSuccess = (userData: User) => {
    setUser(userData); // 사용자 정보 설정
    setIsLoggedIn(true); // 로그인 상태 변경
    localStorage.setItem('user', JSON.stringify(userData)); // 로컬 스토리지에 저장
    setShowLoginModal(false); // 로그인 모달 닫기
  };

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
            onClick={() => { setShowLoginModal(true); }} // 로그인 버튼 클릭 시
            className="px-4 py-2 text-sm bg-none hover:bg-gray-200 text-gray-800 rounded-md"
          >
            로그인
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="프로필"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                {user?.nickname?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium hidden md:block">{user?.nickname}</span>
            <button
              onClick={handleLogout}
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
          onClose={() => setShowLoginModal(false)}
          onSuccess={(userData) => handleLoginSuccess(userData)}
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
