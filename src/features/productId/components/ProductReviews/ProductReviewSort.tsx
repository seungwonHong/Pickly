"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import SortDropDown from "@/components/shared/SortDropDown";

type ReviewSortOrder = "recent" | "ratingDesc" | "ratingAsc" | "likeCount";

interface SelectOption {
  value: ReviewSortOrder;
  name: string;
}

export default function ProductReviewSort({
  sort,
}: {
  sort?: ReviewSortOrder;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get("sort") as ReviewSortOrder | null;
  const [selectedOption, setSelectedOption] = useState(sort ?? "recent");

  useEffect(() => {
    setSelectedOption(sortParam ?? "recent");
  }, [sortParam]);

  const selectList: SelectOption[] = [
    { name: "최신순", value: "recent" },
    { name: "평점 높은 순", value: "ratingDesc" },
    { name: "평점 낮은 순", value: "ratingAsc" },
    { name: "좋아요 많은 순", value: "likeCount" },
  ];

  const handleSelect = (value: string) => {
    setSelectedOption(value as ReviewSortOrder);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full">
      <div className="text-[#f1f1f1] w-full lg:text-[20px] text-[16px] font-medium flex justify-between mb-[30px]">
        <div className="flex items-center">상품리뷰</div>
        <SortDropDown
          selectList={selectList}
          selected={selectedOption}
          onChange={(value) => handleSelect(value)}
        />
      </div>
    </div>
  );
}
