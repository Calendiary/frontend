'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const processLogin = async () => {
      try {
        // 1. 카카오 로그인 처리
        const res = await fetch('/api/auth/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();
        const kakaoUser = {
          kakaoId: data.user.id,
          profileImage: data.user.profileImage,
        };

        // 2. 서버에 유저 존재하는지 확인
        const userRes = await fetch(`${API_URL}/users?kakaoId=${kakaoUser.kakaoId}`);
        const users = await userRes.json();

        if (users.length > 0) {
          // 3. 기존 유저 → kakaoId 저장 후 홈으로
          sessionStorage.setItem('kakaoId', kakaoUser.kakaoId);
        } else {
          // 4. 신규 유저 → tempKakaoUser 저장 후 홈에서 닉네임 모달 띄우기
          sessionStorage.setItem('tempKakaoUser', JSON.stringify(kakaoUser));
        }

        router.push('/');
      } catch (err) {
        console.error('카카오 로그인 처리 실패:', err);
        router.push('/');
      }
    };

    processLogin();
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>카카오 로그인 처리 중입니다...</p>
    </div>
  );
}
