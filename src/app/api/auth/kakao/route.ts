import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    // 카카오 인증 토큰 획득
    const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || `${request.nextUrl.origin}/api/auth/kakao/callback`;
    
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY || '',
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: '카카오 인증 토큰 획득 실패' },
        { status: 400 }
      );
    }
    
    // 카카오 사용자 정보 요청
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    
    const userData = await userResponse.json();
    
    if (!userResponse.ok) {
      return NextResponse.json(
        { error: '카카오 사용자 정보 요청 실패' },
        { status: 400 }
      );
    }
    
    // 여기서 사용자 정보를 DB에 저장하거나, 세션/JWT 토큰을 생성합니다
    // 예: 세션 쿠키 설정 또는 JWT 토큰 생성
    
    // 필요한 유저 정보만 추출하여 반환
    const user = {
      id: userData.id,
      nickname: userData.properties?.nickname || '사용자',
      profileImage: userData.properties?.profile_image || null,
    };
    
    // 여기서 JWT 토큰을 생성하거나 세션을 설정할 수 있습니다
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    return NextResponse.json({ 
      success: true, 
      user,
      // token, // JWT 토큰 사용 시
    });
  } catch (error) {
    console.error('카카오 인증 처리 중 오류:', error);
    return NextResponse.json(
      { error: '카카오 인증 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}