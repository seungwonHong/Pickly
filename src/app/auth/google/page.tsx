'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useOAuthLoginMutation } from '@/app/signin/useSignIn';
import toast from 'react-hot-toast';
import Loading from '@/app/landingpage/loading';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? '';

  
  const { mutate: oAuthLogin } = useOAuthLoginMutation({
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님, 로그인 성공!`);
      router.replace("/homepage");
      console.log('pickly 구글 로그인 완료:', data);
    },
  });
  useEffect(() => {
    if (!code) return;

    let id_token: string = '';
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

        if (!redirectUri) {
          throw new Error('Google redirect URI is not defined');
        }

        id_token = tokenRes.data.id_token;
        console.log('구글 토큰발급 완료:', tokenRes);

        
        // 2. 토큰 발급 후 로그인 처리
        oAuthLogin({
          redirectUri: redirectUri,
          token: id_token,
          provider: "google",
        });

      } catch (error: any) {
        if (error.response?.status === 403) {
          toast(`처음이시네요! 간편회원가입 페이지로 이동합니다.`);
          router.replace(`/signup/google?provider=google&token=${encodeURIComponent(id_token)}`);
          console.log('로그인 정보없음 : 403 -> 간편회원가입 이동:', code);
        } else {
          toast.error(`로그인 실패 😢: ${error.message}`);
        }
      }
    };

    fetchToken();
  }, [code]);

  return <Loading />;
}
