'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        const tokenRes = await axios.post(
          'https://oauth2.googleapis.com/token',
          {
            grant_type: 'authorization_code',
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
            code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            transformRequest: [(data) => new URLSearchParams(data).toString()],
          }
        );

        const { access_token } = tokenRes.data;

        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        console.log('구글 사용자 정보:', userInfoRes.data);

        // 로그인 후 메인으로 이동
        router.push('/');
      } catch (err) {
        console.error('구글 로그인 실패 😢', err);
      }
    };

    fetchToken();
  }, [code]);

  return <p>구글 로그인 중입니다...⏳</p>;
}
