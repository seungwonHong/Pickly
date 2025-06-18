import Header from "@/components/shared/Header";
import { Suspense } from "react";
import LoadingClient from "./loadingClient";
import dynamic from "next/dynamic";

const CompareProductForm = dynamic(
  () => import("@/features/compare/components/CompareProductForm"),
  { ssr: false }
);

export default function Compare() {
  return (
    <div>
      <Header />
      <div className="flex flex-col mt-[40px]">
        <Suspense fallback={<LoadingClient />}>
          <CompareProductForm />
        </Suspense>
      </div>
    </div>
  );
}
