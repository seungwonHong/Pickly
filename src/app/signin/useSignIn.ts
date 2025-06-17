import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse, LoginForm } from "./validationSchema";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useLoginMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, LoginForm>
) {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      // 1. 로그인 시도 (백엔드 인증 서버)
      const res = await apiInstance.post<AuthResponse>("/auth/signIn", form);
      const data = res.data;

      // 2. 받은 토큰을 Next.js API Route로 전달
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

  return {
    ...mutation,
  };
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



interface OAuthLoginForm {
  nickname?: string; 
  redirectUri: string;
  token: string;
  provider: "google" | "kakao";
}

export function useKakaoLoginMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, OAuthLoginForm>
) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ nickname =".",  redirectUri, token, provider }: OAuthLoginForm) => {
      try {
        // 1. 회원가입 시도
        const joinRes = await apiInstance.post<AuthResponse>(
          `/auth/signUp/kakao`,
          { nickname, redirectUri, token }
        );

        const data = joinRes.data;
        console.log("🆕 회원가입 성공:", data);

        // 회원가입 성공 후 닉네임이 . 이면 간변회원가입으로 이동 후 패치
        if (data.user.nickname === ".") {
          console.log("간편회원가입 필요, 닉네임이 '.' 입니다.");
          // console.log("간편회원가입으로 이동");
          // router.push(`/signup/kakao`);
        }
        // 2. accessToken -> Next.js API Route로 저장
        await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: data.accessToken }),
        });

        return data;

      } catch (err: any) {
        if (err.response?.status === 409) {
          // 이미 가입됨 → 로그인 시도
          const loginRes = await apiInstance.post<AuthResponse>(
            `/auth/signIn/${provider}`,
            { redirectUri, token }
          );

          const data = loginRes.data;
          console.log("🔁 기존 유저 로그인 성공:", data);

          await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: data.accessToken }),
          });

          return data;
        }

        // 그 외 에러
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님, 로그인 성공!`);
      router.replace("/homepage");
      console.log("✅ 카카오 로그인 성공:", data);
    },
    onError: (error) => {
      toast.error("로그인/회원가입 실패했습니다.");
      console.log("에러 상세:", error);
    },
    ...options,
  });

  return mutation;
}
