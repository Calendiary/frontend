// src/hooks/useAuthUser.ts
import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { getUserByKakaoId } from '@/app/api/user/route'
import { usePathname } from 'next/navigation';

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
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

    getUserByKakaoId(kakaoId)
      .then((user) => {
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        } else {
          sessionStorage.removeItem('kakaoId');
        }
      })
      .catch(() => {
        sessionStorage.removeItem('kakaoId');
      });
  }, [pathname]);

  const logout = () => {
    sessionStorage.removeItem('kakaoId');
    sessionStorage.removeItem('tempKakaoUser');
    sessionStorage.removeItem('nicknameModalChecked');
    setUser(null);
    setIsLoggedIn(false);
  };

  return {
    user,
    isLoggedIn,
    showNicknameModal,
    setShowNicknameModal,
    logout,
  };
};
