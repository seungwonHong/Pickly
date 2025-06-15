import axiosInstance from '@/features/productId/axiosInstance';
import type { OAuthProvider } from '../types/oauth.types';

export interface OAuthTokenRequest {
  code: string;
  redirectUri: string;
  provider: OAuthProvider;
}

export interface OAuthSignUpRequest {
  nickname: string;
  redirectUri: string;
  token: string;
  provider: OAuthProvider;
  teamId: string;
}

/**
 * Google 또는 Kakao로부터 access_token 얻기
 */
export async function requestOAuthToken({ code, redirectUri, provider }: OAuthTokenRequest) {
  const endpoint =
    provider === 'google'
      ? 'https://oauth2.googleapis.com/token'
      : 'https://kauth.kakao.com/oauth/token';

  const payload =
    provider === 'google'
      ? {
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
          client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
          redirect_uri: redirectUri,
          code,
        }
      : {
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '',
          redirect_uri: redirectUri,
          code,
        };

  const filteredPayload: Record<string, string> = {};
  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value !== 'undefined') {
      filteredPayload[key] = String(value);
    }
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await axiosInstance.post(endpoint, new URLSearchParams(filteredPayload).toString(), { headers });
  return response.data;
}

/**
 * access_token으로 사용자 정보 가져오기
 */
export async function fetchOAuthUserInfo(provider: OAuthProvider, accessToken: string) {
  const endpoint =
    provider === 'google'
      ? 'https://www.googleapis.com/oauth2/v2/userinfo'
      : 'https://kapi.kakao.com/v2/user/me';

  const response = await axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

/**
 * 우리 서비스 회원가입 요청
 */
export async function signUpWithOAuth({
  nickname,
  redirectUri,
  token,
  provider,
  teamId,
}: OAuthSignUpRequest) {
  const response = await axiosInstance.post(`/auth/signUp/${provider}`, {
    nickname,
    redirectUri,
    token,
  });

  return response.data;
}
