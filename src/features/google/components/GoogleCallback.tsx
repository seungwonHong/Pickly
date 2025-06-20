'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useOAuthLoginMutation } from '@/app/signin/useSignIn';
import toast from 'react-hot-toast';

const base64UrlDecode = (str: string) => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  const decoded = Buffer.from(base64 + pad, 'base64').toString('utf-8');
  return decoded;
};

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const code = searchParams.get('code');

  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? '';

  const { mutate: oAuthLogin } = useOAuthLoginMutation({
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님, 로그인 성공!`);
      router.replace("/homepage");
    },
    onError: () => {
      toast.error("로그인 실패 😢");
    },
  });
  
  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      let id_token = '';
      try {
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

         id_token = tokenRes.data.id_token;

        console.log('tokenRes:', tokenRes);

        
        if (!redirectUri) {
          throw new Error('Google redirect URI is not defined');
        }
        
        oAuthLogin({
          redirectUri: redirectUri,
          token: id_token,
          provider: "google",
        });

      } catch (err: any) {
        const parseEmailFromIdToken = (id_token: string) => {
          try {
            const payload = JSON.parse(base64UrlDecode(id_token.split('.')[1]));
            return payload.email || 'unknown';
          } catch (e) {
            return 'unknown';
          }
        };

        if (err.response?.status === 403) {
          const backendEmail = err.response?.data?.email;
          const fallbackEmail = parseEmailFromIdToken(id_token); // 여기서 접근 가능
          const email = backendEmail || fallbackEmail;

          router.replace(`/signup/google?email=${encodeURIComponent(email)}&provider=google&token=${encodeURIComponent(id_token)}`);
        } else {
          console.error('구글 로그인 실패 😢', err);
        }
      }
    };

    fetchToken();
  }, [code]);

  return <p>구글 로그인 중입니다...⏳</p>;
}
