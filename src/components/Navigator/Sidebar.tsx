'use client';  // 클라이언트 컴포넌트임을 명시

import { useTheme, Theme } from '../../contexts/ThemeContext';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // ✅ Next.js 13 app 라우팅 전용 훅
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const themes: Theme[] = ['pink', 'blue', 'green', 'beige'];  // ✅ 타입 지정된 테마 배열
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();  // ✅ 현재 경로 확인
  const isActive = (path: string) => pathname === path;
  const [openTheme, setOpenTheme] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 z-50">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-200">
        Calendiary
      </div>

      {/* 홈 */}
      <Link
        href="/"
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
          isActive('/') ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        <AiOutlineHome className="text-xl" />
        <span>홈</span>
      </Link>

      {/* 일정 */}
      <Link
        href="/list"
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
          isActive('/list') ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        <AiOutlineUnorderedList className="text-xl" />
        <span>일정</span>
      </Link>

      {/* 테마 선택 */}
      <button
        onClick={() => setOpenTheme((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition text-left"
      >
        <FontAwesomeIcon icon={faPalette} className="text-xl" />
        <span>테마 선택</span>
      </button>

      {/* 테마 옵션 */}
      {openTheme && (
        <div className="flex flex-col gap-2 mt-2 px-6">
          {themes.map((color) => (
            <button
              key={color}
              onClick={() => setTheme(color)}  // ✅ 이제 타입 안전
              className={`py-1 px-3 rounded text-left text-sm capitalize ${
                theme === color
                  ? 'bg-gray-200 font-semibold'
                  : 'hover:bg-gray-100'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
