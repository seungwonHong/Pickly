"use client";

import { useEffect } from "react";
import { productService } from "@/features/compare/api/api";
import CompareProductForm from "@/features/compare/components/CompareProductForm";
import Header from "@/components/shared/Header";

export default function Compare() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getProducts({

      });
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <CompareProductForm />
    </div>
  );
}
