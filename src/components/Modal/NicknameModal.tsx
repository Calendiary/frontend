import React, { useState } from 'react';

const NicknameModal: React.FC<{ onClose: () => void; onSubmit: (nickname: string) => void }> = ({ onClose, onSubmit }) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력해주세요');
      return;
    }
    onSubmit(nickname);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">닉네임을 입력해주세요</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="닉네임"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md"
        >
          제출
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 hover:underline"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default NicknameModal;
