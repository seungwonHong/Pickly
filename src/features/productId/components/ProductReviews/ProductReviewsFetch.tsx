"use client";
import { useState } from "react";

import ProductReviewsInfinite from "./ProductReviewsInfinite";
import { GetProductIdReviews } from "../../types";
import SortDropDown from "@/components/shared/SortDropDown";

interface ProductReviewsClientProps {
  initialData: GetProductIdReviews;
  productId: number;
  initialOrder?:
    | "recent"
    | "ratingDesc"
    | "ratingAsc"
    | "likeCount"
    | undefined;
}

export default function ProductReviewsFetch({
  initialData,
  productId,
  initialOrder,
}: ProductReviewsClientProps) {
  const selectList = [
    { name: "최신순", value: "recent" },
    { name: "평점 높은 순", value: "ratingDesc" },
    { name: "평점 낮은 순", value: "ratingAsc" },
    { name: "좋아요 많은 순", value: "likeCount" },
  ];
  const [selectedOption, setSelectedOption] = useState("recent");
  const [dataForSelectedOrder, setDataForSelectedOrder] = useState<
    GetProductIdReviews | undefined
  >(initialOrder === selectedOption ? initialData : undefined);

  const onSortChange = (newSort: typeof selectedOption) => {
    setSelectedOption(newSort);
    setDataForSelectedOrder(undefined);
  };
  return (
    <div className="mt-[60px]">
      <div className="text-[#f1f1f1] text-[20px] font-semibold flex justify-between mb-[30px]">
        <div>상품리뷰</div>

        <SortDropDown
          selectList={selectList}
          selected={selectedOption}
          onChange={onSortChange}
        />
      </div>
      <div className="min-h-[1000px]">
        <ProductReviewsInfinite
          initialData={dataForSelectedOrder}
          productId={productId}
          order={selectedOption}
        />
      </div>
    </div>
  );
}
