"use client";
import { Suspense } from "react";

import CompareProductForm from "@/features/compare/components/CompareProductForm";
import LoadingClient from "@/app/compare/loadingClient";

export default function CompareClient() {
  return (
    <div className="flex flex-col my-[40px]">
      <Suspense fallback={<LoadingClient />}>
        <CompareProductForm />
      </Suspense>
    </div>
  );
}
