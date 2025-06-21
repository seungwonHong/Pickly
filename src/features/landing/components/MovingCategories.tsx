"use client";
import Marquee from "react-fast-marquee";
import CategoryChip from "@/components/CategoryChip";
import React from "react";

const categories = [
  { category: "음악", className: "w-[129px] !h-[60px] text-[24px]" },
  { category: "영화/드라마", className: "w-[218px] !h-[60px] text-[24px]" },
  { category: "강의/책", className: "w-[176px] !h-[60px] text-[24px]" },
  { category: "호텔", className: "w-[129px] !h-[60px] text-[24px]" },
  { category: "가구/인테리어", className: "w-[236px] !h-[60px] text-[24px]" },
  { category: "식당", className: "w-[129px] !h-[60px] text-[24px]" },
  { category: "전자기기", className: "w-[157px] !h-[60px] text-[24px]" },
  { category: "화장품", className: "w-[150px] !h-[60px] text-[24px]" },
  { category: "앱", className: "w-[120px] !h-[60px] text-[24px]" },
];

const MovingCategories = () => {
  return (
    <div className="overflow-x-hidden 2xl:mt-[200px] lg:mt-[150px] md:mt-[100px] mt-[60px]">
      <Marquee
        speed={60}
        gradient={true}
        gradientColor="#191921" // 배경 색상에 맞게 조정
        gradientWidth={60}
        autoFill={true}
      >
        {categories.map((item, idx) => (
          <div key={idx} className="mr-[27px]">
            <CategoryChip category={item.category} className={item.className} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MovingCategories;
