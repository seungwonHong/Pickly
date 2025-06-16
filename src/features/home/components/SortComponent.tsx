"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SortDropDown from "@/components/shared/SortDropDown";

interface SelectOption {
  value: string;
  name: string;
}

const SortComponent = () => {
  const [selectedOption, setSelectedOption] = useState("recent");

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectList: SelectOption[] = [
    { value: "recent", name: "최신순" },
    { value: "rating", name: "별점순" },
    { value: "reviewCount", name: "리뷰 많은순" },
  ];

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <SortDropDown
        selectList={selectList}
        selected={selectedOption}
        onChange={(value) => handleSelect(value)}
      />
    </div>
  );
};

export default SortComponent;
