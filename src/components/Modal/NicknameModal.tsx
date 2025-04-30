// ✅ NicknameModal.tsx
'use client';
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const NicknameModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [nickname, setNickname] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async () => {
    const temp = sessionStorage.getItem('tempKakaoUser');
    if (!temp) return;
    const kakaoUser = JSON.parse(temp);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kakaoId: kakaoUser.kakaoId,
          nickname,
          profile_image: kakaoUser.profileImage,
        }),
      });

      if (!res.ok) throw new Error('닉네임 등록 실패');

      const newUser = await res.json();
      sessionStorage.setItem('kakaoId', newUser.kakaoId);
      sessionStorage.removeItem('tempKakaoUser');
      onSuccess();
    } catch (err) {
      console.error('닉네임 저장 실패:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2000]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">닉네임 설정</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        />
        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded">제출</button>
      </div>
    </div>
  );
};

export default NicknameModal;
