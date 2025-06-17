"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/landingpage/loading";
import { useKakaoLoginMutation } from "@/app/signin/useSignIn";

export default function KakaoCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? "";

  const { mutate: oAuthLogin } = useKakaoLoginMutation();

  useEffect(() => {
    if (!code) return;
    oAuthLogin({
      redirectUri,
      token: code,
      provider: "kakao",
    });
  }, [code]);

  return <Loading />;
}
