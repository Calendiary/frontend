import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const KakaoCallback: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { code } = router.query; // URL에서 code를 받아옴

    if (code) {
      const fetchKakaoToken = async () => {
        const response = await fetch('/api/kakao/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        });

        const data = await response.json();

        if (data.access_token) {
          // 액세스 토큰을 받아서 로그인 성공 처리
          console.log('카카오 로그인 성공:', data);
          router.push('/nickname'); // 닉네임 입력 페이지로 이동
        } else {
          console.error('카카오 로그인 실패');
        }

        setIsLoading(false);
      };

      fetchKakaoToken();
    }
  }, [router.query]);

  return (
    <div className="flex justify-center items-center">
      {isLoading ? <p>로그인 중...</p> : <p>로그인 완료</p>}
    </div>
  );
};

export default KakaoCallback;
