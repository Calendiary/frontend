'use client';

import { useTheme, Theme } from '../context/ThemeContext';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';  // ✅ 바뀐 부분
import Link from 'next/link';  // react-router-dom의 Link를 next/link로 변경
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faX,
  faHome,
  faCalendarAlt,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  onClose: () => void;
}

const MobileSidebar: React.FC<Props> = ({ onClose }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const themes: Theme[] = ['pink', 'blue', 'green', 'beige'];  // ✅ 타입 지정된 테마 배열
  const { theme, setTheme } = useTheme();
  const [openTheme, setOpenTheme] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[2000] lg:hidden">
      <div className="w-64 h-full bg-white shadow-lg p-5 flex flex-col">
        {/* 상단 닫기 버튼 */}
        <div className="flex justify-start ml-1 mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        {/* 네비게이션 링크 */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"  // React Router의 to 대신 href 사용
            onClick={onClose}
            className={`flex items-center gap-3 px-2 py-2 rounded-md text-base transition ${
              isActive('/')
                ? 'text-gray-900 font-semibold bg-gray-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FontAwesomeIcon
              icon={faHome}
              className="text-lg"
            />
            홈
          </Link>

          <Link
            href="/list"  // React Router의 to 대신 href 사용
            onClick={onClose}
            className={`flex items-center gap-3 px-2 py-2 rounded-md text-base transition ${
              isActive('/list')
                ? 'text-gray-900 font-semibold bg-gray-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-lg"
            />
            일정
          </Link>
          {/* 테마 선택 */}
          <button
            onClick={() => setOpenTheme((prev) => !prev)}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition text-left"
          >
            <FontAwesomeIcon
              icon={faPalette}
              className="text-xl"
            />
            <span>테마 선택</span>
          </button>

          {/* 펼쳐진 테마 색상 선택 */}
          {openTheme && (
            <div className="flex flex-col gap-2 mt-2 px-6">
              {themes.map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setTheme(color)}
                    className={`py-1 px-3 rounded text-left text-sm capitalize ${
                      theme === color
                        ? 'bg-gray-200 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {color}
                  </button>
                )
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
