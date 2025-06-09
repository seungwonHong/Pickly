"use client";
import { useEffect } from "react";
import { productService } from "@/features/productId/api";
export default function TestComponent() {
  useEffect(() => {
    console.log("useEffect 실행");
    productService
      .getProductsId(1231)
      .then((res) => {
        console.log("응답 데이터:", res.data);
      })
      .catch((e) => {
        console.error("에러 발생:", e);
      });
  }, []);

  return <div>테스트 페이지</div>;
}
