"use client";

import SortDropDown from "@/components/shared/SortDropDown";

const selectList = [
  { value: "recent", name: "최신순" },
  { value: "ratingDesc", name: "별점 높은순" },
  { value: "ratingAsc", name: "별점 낮은순" },
  { value: "likeCount", name: "좋아요순" },
];

interface ProductReviewSortProps {
  selected: string;
  onChange: (value: string) => void;
}

export default function ProductReviewSort({
  selected,
  onChange,
}: ProductReviewSortProps) {
  return (
    <SortDropDown
      selectList={selectList}
      selected={selected}
      onChange={onChange}
    />
  );
}
