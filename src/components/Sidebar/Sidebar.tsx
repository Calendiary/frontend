import { useTheme } from '../../context/ThemeContext';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [openTheme, setOpenTheme] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 z-50">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-200">
        Calendiary
      </div>

      {/* 홈 */}
      <Link
        to="/"
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
          isActive('/') ? 'bg-gray-100 font-semibold' : ''
        }`}
      >
        <AiOutlineHome className="text-xl" />
        <span>홈</span>
      </Link>

      {/* 일정 */}
      <Link
        to="/list"
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
          isActive('/list')
            ? 'bg-gray-100 font-semibold'
            : ''
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
        <FontAwesomeIcon
          icon={faPalette}
          className="text-xl"
        />
        <span>테마 선택</span>
      </button>

      {/* 펼쳐진 테마 색상 선택 */}
      {openTheme && (
        <div className="flex flex-col gap-2 mt-2 px-6">
          {['pink', 'blue', 'green', 'beige'].map(
            (color) => (
              <button
                key={color}
                onClick={() => setTheme(color as any)}
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
    </aside>
  );
};

export default Sidebar;
