import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse, LoginForm } from "./validationSchema";


export function useLoginMutation(options?: UseMutationOptions<AuthResponse, any, LoginForm>) {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      // 1. 로그인 시도 (백엔드 인증 서버)
      const res = await apiInstance.post<AuthResponse>('/auth/signIn', form);
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