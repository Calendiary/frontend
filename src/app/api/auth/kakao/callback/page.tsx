'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // 부모 창이 있는 경우(팝업이 아닌 경우) 코드를 전달
      if (window.opener) {
        window.opener.postMessage({ type: 'KAKAO_LOGIN_SUCCESS', code }, window.location.origin);
        window.close();
      } else {
        // 부모 창이 없는 경우 직접 처리
        processKakaoLogin(code);
      }
    } else {
      // 인증 코드가 없으면 홈으로 이동
      router.push('/');
    }
  }, [searchParams, router]);
  
  const processKakaoLogin = async (code: string) => {
    try {
      const response = await fetch('/api/auth/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 리다이렉트할 경로로 이동 (홈으로)
        router.push('/');
      } else {
        console.error('카카오 로그인 처리 실패');
        router.push('/');
      }
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류:', error);
      router.push('/');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">카카오 로그인 처리 중...</h1>
        <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 mx-auto animate-spin"></div>
      </div>
    </div>
  );
}