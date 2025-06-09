"use client";
import { useState, useRef } from "react";

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
  const [selectedOption, setSelectedOption] = useState(
    initialOrder || "recent"
  );
  const isFirstRender = useRef(true);

  const onSortChange = (value: string) => {
    setSelectedOption(
      value as "recent" | "ratingDesc" | "ratingAsc" | "likeCount"
    );
    isFirstRender.current = false; // 옵션 바꿀 때만 false로!
  };

  // 최초 렌더에만 initialData 전달
  const reviewsInitialData =
    isFirstRender.current && selectedOption === initialOrder
      ? initialData
      : undefined;

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
      <div>
        <ProductReviewsInfinite
          initialData={reviewsInitialData}
          productId={productId}
          order={selectedOption}
          queryKey={["reviews", productId, selectedOption]}
          nextCursor={undefined}
        />
      </div>
    </div>
  );
}
