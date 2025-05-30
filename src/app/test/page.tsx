
"use client";

import SortDropDown from "@/components/shared/SortDropDown";
import { useState } from "react";
type SelectOption = {
  value: string;
  name: string;
};

export default function TestPage() {
  // Available values : recent, ratingDesc, ratingAsc, likeCount
  const selectList: SelectOption[] = [
    { value: "recent", name: "최신순" },
    { value: "ratingDesc", name: "별점 높은순" },
    { value: "ratingAsc", name: "별점 낮은순" },
    { value: "likeCount", name: "좋아요순" },
  ];
  const [selectedOption, setSelectedOption] = useState("recent");
  return (
    <div className="bg-[#1c1c22] w-full h-full flex flex-col items-center justify-center gap-4 ">
      <SortDropDown
        selectList={selectList}
        selected={selectedOption}
        onChange={(value) => setSelectedOption(value)}
      />

    </div>
  );
}
