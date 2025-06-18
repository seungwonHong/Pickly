"use client";

import CompareProductForm from "@/features/compare/components/CompareProductForm";
import Header from "@/components/shared/Header";

export default function Compare() {
  return (
    <div>
      <Header />
      <div className="flex flex-col mt-[40px]">
        <CompareProductForm />
      </div>
    </div>
  )
}