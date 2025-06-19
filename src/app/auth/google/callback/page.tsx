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

        console.log('구글 토큰:', access_token);
        
        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });


        // 우리 서비스에서 이 유저가 없는 경우 → 회원가입
        const { email } = userInfoRes.data;

        const userCheckRes = await axios.post(`/auth/signIn/google`, {
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          token: access_token, // 또는 id_token
        });

        if (userCheckRes.data.exists) {
          // 로그인 처리 후 메인 이동
          // router.push('/');
          console.log('구글 사용자 정보:', userInfoRes.data);
        } else {
          // 회원가입 페이지로 이동, 필요한 정보 전달
          router.push(`/signup/oauth?email=${email}&provider=google`);
        }
        // 로그인 후 메인으로 이동
        // router.push('/');
      } catch (err) {
        console.error('구글 로그인 실패 😢', err);
      }
    };

    fetchToken();
  }, [code]);

  return <p>구글 로그인 중입니다...⏳</p>;
}
