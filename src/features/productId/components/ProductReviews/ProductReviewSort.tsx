"use client";
import { useState } from "react";

import useGetProductSort from "../../hooks/useGetProductSort";
import SortDropDown from "@/components/shared/SortDropDown";

interface SelectOption {
  value: string;
  name: string;
}
export default function ProductReviewSort() {
  const selectList: SelectOption[] = [
    { value: "recent", name: "최신순" },
    { value: "ratingDesc", name: "별점 높은순" },
    { value: "ratingAsc", name: "별점 낮은순" },
    { value: "likeCount", name: "좋아요순" },
  ];
  const [selectedOption, setSelectedOption] = useState("recent");
  const { data: productSortData } = useGetProductSort(
    undefined,
    undefined,
    selectedOption,
    undefined
  );
  return (
    <div className="text-[#f1f1f1] text-[20px] font-semibold flex justify-between mb-[30px]">
      <SortDropDown
        selectList={selectList}
        selected={selectedOption}
        onChange={(value) => setSelectedOption(value)}
      />
    </div>
  );
}
