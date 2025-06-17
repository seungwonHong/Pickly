"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { kakaoJoinRedirecteUrl } from '@/features/productId/auth';
import { useKakaoJoinMutation } from "../../useSignUp";
import { AxiosError } from "axios";

export default function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code")  || "";

  let cachedString = "";
  let cached: { nickname?: string } = {};
  let nickname = "";

  if (typeof window !== "undefined") {
   cachedString = localStorage.getItem("joinTempData") || "";
   cached = cachedString ? JSON.parse(cachedString) : {};
   nickname = cached.nickname || "";
  }
  console.log('cached:', cached);

  const { mutate: oAuthJoin } = useKakaoJoinMutation({
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님, 환영합니다!`);
      localStorage.removeItem("joinTempData");
      router.replace("/homepage");
    },
    onError: (error: AxiosError | any) => {
      const message = error?.response?.data?.message ;
      console.log(message);
    },
  });

  useEffect(() => {
    oAuthJoin({
      nickname: nickname,
      redirectUri: kakaoJoinRedirecteUrl,
      token: code,
      provider: "kakao",
    });
  }, [code]);

  return <div className="text-center mt-[100px]">가입 진행 중입니다...</div>;
}
