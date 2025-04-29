// pages/api/kakao/token.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET; // 카카오 API 보안키 (필요시)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;

    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: kakaoClientId,
      redirect_uri: kakaoRedirectUri,
      code,
      client_secret: kakaoClientSecret, // 필요시 추가
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      body: params,
    });

    const data = await response.json();

    if (data.access_token) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: 'Failed to get access token' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
