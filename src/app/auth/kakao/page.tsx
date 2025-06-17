'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/landingpage/loading';
import { useOAuthLoginMutation } from '@/app/signin/useSignIn';
import toast from 'react-hot-toast';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '';

  const { mutate: oAuthLogin } = useOAuthLoginMutation({
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님, 로그인 성공!`);
      router.replace("/homepage");
      console.log('카카오 로그인 성공:', data);
    },
    onError: (error) => {
      if (error.response?.status === 403) {
        toast(`처음이시네요! 간편회원가입 페이지로 이동합니다.`);
        router.replace(`/signup/kakao?provider=kakao&code=${code}`);
        console.log('로그인 정보없음 : 403 -> 간편회원가입 이동:', code);
      } else {
        toast.error(`로그인 실패 😢: ${error.message}`);
      }
    },
  });
  
  useEffect(() => {
    if (!code) return;

      // 1. 토큰 발급
      oAuthLogin({
        redirectUri: redirectUri,
        token: code,
        provider: "kakao",
      });
      console.log('카카오 토큰 발급 요청:', code);

    }, [code]);

  return <Loading />;
}
