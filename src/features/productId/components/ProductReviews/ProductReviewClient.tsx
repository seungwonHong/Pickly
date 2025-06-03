"use client";

import { productService } from "@/features/productId/api";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
import { useParams } from "next/navigation";
import { GetProductIdReviews } from "@/features/productId/types";
import { useState } from "react";
interface Props {
  initialData: GetProductIdReviews;
  productId: number;
}

export default function ProductReviewClient({ initialData, productId }: Props) {
  const [order, setOrder] = useState<
    "recent" | "ratingDesc" | "ratingAsc" | "likeCount"
  >("recent");

  return (
    <ProductReviewsFetch
      initialData={initialData}
      productId={productId}
      order={order}
      setOrder={setOrder}
    />
  );
}
