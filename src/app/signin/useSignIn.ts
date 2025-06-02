import apiInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface LoginForm {
  email: string;
  password: string;
}

export function useLoginMutation() {
  const mutation = useMutation({
    mutationFn: async (form: LoginForm) => {
      const res = await apiInstance.post('/auth/signIn', form);
      return res.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message || '로그인 실패');
      } else {
        console.error('네트워크 오류가 발생했습니다.');
      }
    },
  });

  return  {
    ...mutation
  };
}
