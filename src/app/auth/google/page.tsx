"use client";
import LoadingPage from "@/components/shared/Loading";
import GoogleCallback from "@/features/google/components/GoogleCallback";
import { Suspense } from "react";

export default function GooglePage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <GoogleCallback />
    </Suspense>
  );
}
