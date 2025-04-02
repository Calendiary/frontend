import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="block lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1024px] h-[80px] bg-white shadow-md z-[1000]">
      {/* 필요하면 로고나 제목 여기에 추가 가능 */}
    </div>
  );
};

export default Header;
