import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 z-50">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-200">
        Calendiary
      </div>
      <nav className="flex flex-col mt-6 gap-2 px-4">
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
            isActive('/') ? 'bg-gray-100 font-semibold' : ''
          }`}
        >
          <AiOutlineHome className="text-xl" />
          <span>홈</span>
        </Link>
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
      </nav>
    </aside>
  );
};

export default Sidebar;
