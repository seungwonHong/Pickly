import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthResponse, LoginForm } from "./validationSchema";


export function useLoginMutation(options?: UseMutationOptions< AuthResponse, any, LoginForm>) {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      const res = await apiInstance.post<AuthResponse>('/auth/signIn', form);
      return res.data;
    },
    ...options,
  });

  return  {
    ...mutation
  };
}
