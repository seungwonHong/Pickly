import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse, LoginForm } from "./validationSchema";
<<<<<<< HEAD


export function useLoginMutation(options?: UseMutationOptions<AuthResponse, any, LoginForm>) {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      // 1. 로그인 시도 (백엔드 인증 서버)
      const res = await apiInstance.post<AuthResponse>('/auth/signIn', form);
=======
import { AxiosError } from "axios";

export function useLoginMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, LoginForm>
) {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      // 1. 로그인 시도 (백엔드 인증 서버)
      const res = await apiInstance.post<AuthResponse>("/auth/signIn", form);
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      const data = res.data;

      // 2. 받은 토큰을 Next.js API Route로 전달
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
<<<<<<< HEAD
          accessToken: data.accessToken, 
=======
          accessToken: data.accessToken,
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        }),
      });

      return data;
    },
    ...options,
  });

  return {
    ...mutation,
  };
<<<<<<< HEAD
}
=======
}

interface OAuthLoginForm {
  redirectUri: string;
  token: string;
  provider: "google" | "kakao";
}

export function useOAuthLoginMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, OAuthLoginForm>
) {
  const mutation = useMutation({
    mutationFn: async ({ redirectUri, token, provider }: OAuthLoginForm) => {
      // 1. 백엔드에 OAuth 로그인 요청
      const res = await apiInstance.post<AuthResponse>(
        `/auth/signIn/${provider}`,
        {
          redirectUri,
          token,
        }
      );

      const data = res.data;

      // 2. 받은 accessToken을 Next.js API Route로 전달하여 쿠키 저장
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.accessToken,
        }),
      });

      return data;
    },
    ...options,
  });

  return mutation;
}
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
