'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const code = searchParams.get('code');

  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        // 1. 카카오에서 access_token 요청
        const payload = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
          redirect_uri: redirectUri!,
          code: code!,
          client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!, // 있다면
        });

        const tokenRes = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          payload.toString(), // 반드시 toString으로 변환
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        );
        const { access_token } = tokenRes.data;
        console.log('카카오 access_token:', tokenRes);
        console.log({
          code,
          redirectUri,
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
        });
        // 2. 우리 백엔드에 access_token 전달
        const kakaoUserCheckRes = await axios.post(`${Base_URL}/auth/signIn/kakao`, {
          redirectUri,
          token: access_token,
        });

        // 3. 로그인 성공 → 메인 페이지 이동
        // router.push('/');
      } catch (err: any) {

        const raw = err?.response?.data || 'no data';
        console.error('Axios 에러:', err.message);
        console.warn('응답 raw data:', raw);
        if (err.response?.status === 403) {
          // router.replace(`/signup/kakao?email=${encodeURIComponent(email)}&provider=kakao`);
        } else {
          console.error('카카오 로그인 실패 😢', err);
        }
      }
    };


    fetchToken();
  }, [code]);

  return <p>카카오 로그인 중입니다...⏳</p>;
}
