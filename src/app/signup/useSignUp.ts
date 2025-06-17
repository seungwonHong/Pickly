import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { JoinForm } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";
import { AxiosError } from "axios";

export function useSignUp(options?: UseMutationOptions< AuthResponse, AxiosError, JoinForm>) {
  const mutation = useMutation({
    mutationFn: async (form: JoinForm) => {
      const res = await apiInstance.post<AuthResponse>('/auth/signUp', form);
      return res.data;
    },
    ...options,
  });

  return {
    ...mutation,
  };
}


interface OAuthJoinForm {
  nickname: string;
  redirectUri: string;
  token: string;
  provider: "google" | "kakao";
}

export function useGoogleJoinMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, OAuthJoinForm>
) {
  const mutation = useMutation({
    mutationFn: async ({ nickname, redirectUri, token, provider }: OAuthJoinForm) => {
      // 1. 백엔드에 OAuth 로그인 요청
      const res = await apiInstance.post<AuthResponse>(
        `/auth/signUp/${provider}`,
        {
          nickname,
          redirectUri,
          token,
        }
      );

      const data = res.data;

      console.log(`서버에 OAuth 로그인 요청 완료: ${data}`);
      // // 2. 받은 accessToken을 Next.js API Route로 전달하여 쿠키 저장
      // await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     accessToken: data.accessToken,
      //   }),
      // });

      // console.log(`next.js API Route에 accessToken 전달: ${data.accessToken}`);

      return data;
    },
    ...options,
  });

  return mutation;
}

export function useKakaoJoinMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, OAuthJoinForm>
) {
  const mutation = useMutation({
    mutationFn: async ({ nickname, redirectUri, token, provider }: OAuthJoinForm) => {
      // 1. 백엔드에 OAuth 로그인 요청
      const res = await apiInstance.post<AuthResponse>(
        `/auth/signUp/${provider}`,
        {
          nickname,
          redirectUri,
          token,
        }
      );

      const data = res.data;

      console.log(`서버에 OAuth 로그인 요청 완료: ${data}`);
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

      console.log(`next.js API Route에 accessToken 전달: ${data.accessToken}`);

      return data;
    },
    ...options,
  });

  return mutation;
}
