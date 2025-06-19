'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        const res = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
            redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
            code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            transformRequest: [(data) => new URLSearchParams(data).toString()],
          }
        );

        const { access_token } = res.data;

        const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        console.log('카카오 사용자 정보:', userInfo.data);

        // 로그인 완료 → 원하는 페이지로 이동
        router.push('/');
      } catch (err) {
        console.error('카카오 로그인 실패', err);
      }
    };

    fetchToken();
  }, [code]);

  return <p>로그인 중입니다...⏳</p>;
}
