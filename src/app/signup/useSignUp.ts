import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { JoinForm } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";

export function useSignUp(options?: UseMutationOptions< AuthResponse, any, JoinForm>) {
  const mutation = useMutation({
    mutationFn: async (form: JoinForm) => {
      const res = await apiInstance.post<AuthResponse>('/auth/signUp', form);
      const data = res.data;

      // 2. 받은 토큰을 Next.js API Route로 전달
      await fetch("/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.accessToken, 
        }),
      });

      return res.data;
    },
    ...options,
  });

  return {
    ...mutation,
  };
}

