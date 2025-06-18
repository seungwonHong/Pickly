"use client";
import { Suspense } from "react";
import KakaoCallback from "../../../features/kakao/components/KakaoCallback";

export default function KakaoPage() {
  return (
    <Suspense fallback={<p>카카오 로그인 중입니다...⏳</p>}>
      <KakaoCallback />
    </Suspense>
  );
}