"use client";
import { Suspense } from "react";
import KakaoCallback from "../../../features/kakao/components/KakaoCallback";
import LoadingPage from "@/components/shared/Loading";

export default function KakaoPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <KakaoCallback />
    </Suspense>
  );
}