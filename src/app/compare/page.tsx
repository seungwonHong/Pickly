import CompareProductForm from "@/features/compare/components/CompareProductForm";
import Header from "@/components/shared/Header";
import { Suspense } from "react";
import LoadingClient from "./loadingClient";

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
