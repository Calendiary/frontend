import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

const Navigator: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <nav className="block lg:hidden fixed bottom-0 w-full left-1/2 -translate-x-1/2 max-w-[1024px] bg-gray-100 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex z-[1000]">
      <Link
        to="/"
        className={`w-1/2 flex items-center justify-center py-3 text-2xl transition-colors ${
          isActive('/')
            ? 'text-black font-bold'
            : 'text-gray-500'
        } hover:text-black`}
      >
        <AiOutlineHome />
      </Link>
      <Link
        to="/list"
        className={`w-1/2 flex items-center justify-center py-3 text-2xl transition-colors ${
          isActive('/list')
            ? 'text-black font-bold'
            : 'text-gray-500'
        } hover:text-black`}
      >
        <AiOutlineUnorderedList />
      </Link>
    </nav>
  );
};

export default Navigator;
