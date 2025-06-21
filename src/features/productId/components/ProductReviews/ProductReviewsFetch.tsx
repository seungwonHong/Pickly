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
  const [selectedOption, setSelectedOption] = useState<
    "recent" | "ratingDesc" | "ratingAsc" | "likeCount"
  >(initialOrder ?? "recent");

  const onSortChange = (value: string) => {
    const newSort = value as
      | "recent"
      | "ratingDesc"
      | "ratingAsc"
      | "likeCount";
    setSelectedOption(newSort);
  };
  return (
    <div>
      <div className="text-[#f1f1f1] lg:text-[20px] text-[16px] font-medium flex justify-between mb-[30px]">
        <div>상품리뷰</div>

        <SortDropDown
          selectList={selectList}
          selected={selectedOption}
          onChange={onSortChange}
        />
      </div>
      <div className="md:min-h-[500px] min-h-[200px]">
        <ProductReviewsInfinite
          initialData={
            selectedOption === (initialOrder ?? "recent")
              ? initialData
              : undefined
          }
          productId={productId}
          order={selectedOption}
        />
      </div>
    </div>
  );
}
