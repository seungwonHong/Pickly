'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import LoadingPage from '@/components/shared/Loading';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const code = searchParams.get('code');

  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
useEffect(() => {
  if (!code) return;

  const fetchToken = async () => {
    const payload = {
      redirectUri,
      token: code,
    };

    try {
      // 1. 회원가입 & 로그인 병렬 요청
      const [signUpResult, signInResult] = await Promise.allSettled([
        axios.post(`${Base_URL}/auth/signUp/kakao`, {
          ...payload,
          nickname: 'Test11', // TODO: 최초 회원가입시만 필요. 이후 제거 예정
        }),
        axios.post(`${Base_URL}/auth/signIn/kakao`, payload),
      ]);

      // 2. 성공 응답 중 access_token 있는 거 찾기
      const fulfilled = [signUpResult, signInResult].find(
        (res): res is PromiseFulfilledResult<any> =>
          res.status === 'fulfilled' && res.value?.data?.access_token
      );

      console.log('✅ signUpResult:', signUpResult);
      if (signUpResult.status === 'rejected') {
        console.log('❌ signUpResult reason:', signUpResult.reason);
      }
      const access_token = fulfilled?.value?.data?.access_token;
      console.log('✅ access_token:', access_token);

      if (!access_token) {
        console.warn('access_token 없음. 응답 확인 필요');
        return;
      }

      // 3. 로그인 성공 처리
      // router.push('/');

    } catch (err: any) {
      const status = err?.response?.status;
      const raw = err?.response?.data;

      console.error('❌ 카카오 로그인 실패:', err.message);
      console.warn('서버 응답:', raw);

      if (status === 403) {
        // router.replace(`/signup/kakao?email=${encodeURIComponent(email)}&provider=kakao`);
      }
    }
  };

  fetchToken();
}, [code]);


  return <LoadingPage />;
}
