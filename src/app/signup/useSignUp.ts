import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { JoinForm } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";
<<<<<<< HEAD

export function useSignUp(options?: UseMutationOptions< AuthResponse, any, JoinForm>) {
=======
import { AxiosError } from "axios";

export function useSignUp(options?: UseMutationOptions< AuthResponse, AxiosError, JoinForm>) {
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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

