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
  >("recent");
  const [dataForSelectedOrder, setDataForSelectedOrder] = useState<
    GetProductIdReviews | undefined
  >(initialOrder === selectedOption ? initialData : undefined);

  const onSortChange = (value: string) => {
    const newSort = value as
      | "recent"
      | "ratingDesc"
      | "ratingAsc"
      | "likeCount";
    setSelectedOption(newSort);
    setDataForSelectedOrder(undefined);
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
        {initialData.list.length >= 1 && (
          <ProductReviewsInfinite
            initialData={dataForSelectedOrder}
            productId={productId}
            order={selectedOption}
          />
        )}
        {initialData.list.length === 0 && (
          <div className="text-[#f1f1f1] text-[16px] font-normal text-center md:pt-[200px] pt-[100px]">
            <div className="w-full text-[#6E6E82] lg:text-[20px] md:text-[18px] text-[16px] font-medium">
              첫 리뷰를 작성해보세요!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
