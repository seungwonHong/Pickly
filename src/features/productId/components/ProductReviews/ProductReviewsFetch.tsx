"use client";
import { useState } from "react";
import ProductReviewSort from "./ProductReviewSort";
import ProductReviewsInfinite from "./ProductReviewsInfinite";
import { GetProductIdReviews } from "../../types";

interface ProductReviewsClientProps {
  initialData: GetProductIdReviews;
  productId: number;
}

export default function ProductReviewsList({
  initialData,
  productId,
}: ProductReviewsClientProps) {
  const [order, setOrder] = useState<
    "recent" | "ratingDesc" | "ratingAsc" | "likeCount"
  >("recent");

  const handleChangeOrder = (value: string) => {
    setOrder(value);
  };

  return (
    <div className="mt-[60px]">
      <div className="text-[#f1f1f1] text-[20px] font-semibold flex justify-between mb-[30px]">
        <div>상품리뷰</div>
        <ProductReviewSort selected={order} onChange={handleChangeOrder} />
      </div>
      <ProductReviewsInfinite
        initialData={order === "recent" ? initialData : undefined}
        productId={productId}
        order={order}
      />
    </div>
  );
}
