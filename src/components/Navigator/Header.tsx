// ✅ Header.tsx (닉네임 모달 즉시 뜨도록 개선된 최종 버전)
'use client';
import React, { useEffect, useState } from 'react';
import LoginModal from '../Modal/LoginModal';
import MobileSidebar from './MobileSidebar';
import NicknameModal from '../Modal/NicknameModal';
import { usePathname } from 'next/navigation';

interface User {
  id: number;
  kakaoId: string;
  nickname: string;
  profileImage: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const temp = sessionStorage.getItem('tempKakaoUser');
    const alreadyChecked = sessionStorage.getItem('nicknameModalChecked');

    if (temp && !alreadyChecked) {
      setShowNicknameModal(true);
      sessionStorage.setItem('nicknameModalChecked', 'true');
      return;
    }

    const kakaoId = sessionStorage.getItem('kakaoId');
    if (!kakaoId) return;

    fetch(`${API_URL}/users?kakaoId=${kakaoId}`)
      .then((res) => {
        if (!res.ok) throw new Error('유저 조회 실패');
        return res.json();
      })
      .then((users) => {
        if (!users.length) {
          sessionStorage.removeItem('kakaoId');
          return;
        }

        const u = users[0];
        setUser({
          id: u.id,
          kakaoId: u.kakaoId,
          nickname: u.nickname,
          profileImage: u.profile_image,
        });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error('유저 정보 불러오기 실패:', err);
        sessionStorage.removeItem('kakaoId');
      });
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('kakaoId');
    sessionStorage.removeItem('tempKakaoUser');
    sessionStorage.removeItem('nicknameModalChecked');
    setUser(null);
    setIsLoggedIn(false);
  };

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
            <button onClick={handleLogout} className="text-sm text-gray-600 hover:underline">
              로그아웃
            </button>
          </div>
        )}
      </header>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => window.location.reload()}
        />
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