'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useOAuthLoginMutation } from '@/app/signin/useSignIn';
import toast from 'react-hot-toast';
import Loading from '@/app/landingpage/loading';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [id_token , setIdToken] = useState<string>('');

  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? '';

  const { mutate: oAuthLogin } = useOAuthLoginMutation({
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님, 로그인 성공!`);
      router.replace("/homepage");
    },
    onError: (error) => {
      if (error.response?.status === 403) {
        router.replace(`/signup/google?provider=google&token=${encodeURIComponent(id_token)}`);
      } 
    },
  });
  
  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        // 1. 구글 OAuth2 토큰 발급
        const tokenRes = await axios.post(
          'https://oauth2.googleapis.com/token',
          {
            grant_type: 'authorization_code',
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            redirect_uri: redirectUri,
            code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            transformRequest: [(data) => new URLSearchParams(data).toString()],
          }
        );

        // console.log('tokenRes:', tokenRes);

        if (!redirectUri) {
          throw new Error('Google redirect URI is not defined');
        }

        setIdToken(tokenRes.data.id_token);
        // 2. 토큰 발급 후 로그인 처리
        oAuthLogin({
          redirectUri: redirectUri,
          token: id_token,
          provider: "google",
        });

        // 3. 로그인 성공 → 메인 페이지 이동
        router.push('/homepage');
      } catch (error: any) {
        if (error.response?.status !== 403){
          toast.error(`로그인 실패 😢: ${error.message}`);
        }
      }
    };

    fetchToken();
  }, [code]);

  return <Loading />;
}
