"use client";
import GoogleCallback from "@/features/google/components/GoogleCallback";
import { Suspense } from "react";

export default function GooglePage() {
  return (
    <Suspense fallback={<p>구글 로그인 중입니다...⏳</p>}>
      <GoogleCallback />
    </Suspense>
  );
}
