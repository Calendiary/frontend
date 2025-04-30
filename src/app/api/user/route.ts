// src/apis/user.ts
import { User } from '@/types/user'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserByKakaoId = async (kakaoId: string): Promise<User | null> => {
  const res = await fetch(`${API_URL}/users?kakaoId=${kakaoId}`);
  if (!res.ok) throw new Error('유저 조회 실패');

  const users = await res.json();
  return users.length > 0 ? {
    id: users[0].id,
    kakaoId: users[0].kakaoId,
    nickname: users[0].nickname,
    profileImage: users[0].profile_image,
  } : null;
};
