import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { JoinForm } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";

export function useSignUp(options?: UseMutationOptions< AuthResponse, any, JoinForm>) {
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

