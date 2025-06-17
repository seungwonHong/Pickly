
export const login_logo = "/signup_logo.svg";

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email openid`;
export const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email,profile_nickname,profile_image&prompt=consent`;


export const BASE_URL = process.env.BASE_URL  || "http://localhost:3000";
export const KAKAO_JOIN_URI = `${BASE_URL}/signup/kakao?provider=kakao`;
export const KAKAO_JOIN_REDIRECT_URI = `${BASE_URL}/signup/kakao/redirect`;
export const kakaoJoinUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_JOIN_URI}&response_type=code&scope=account_email,profile_nickname,profile_image&prompt=consent`;
export const kakaoJoinRedirecteUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_JOIN_REDIRECT_URI}&response_type=code&scope=account_email,profile_nickname,profile_image&prompt=consent`;
