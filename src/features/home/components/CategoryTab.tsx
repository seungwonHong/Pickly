"use client";
import React from "react";
import Link from "next/link";

interface Props {
  placeholder: string;
  selected: boolean;
  icon?: React.ReactElement;
}

const CategoryTab = ({ placeholder, selected, icon }: Props) => {
  const textColor = selected ? "#F1F1F5" : "#6E6E82";
  const backGroundColor = selected ? "#252530" : "#1C1C22";
  console.log(`${placeholder} :${selected}`);

  return (
    <Link href={`/homepage/${encodeURIComponent(placeholder)}?sort=recent`}>
      <div
        className={`flex flex-row items-center w-full lg:h-[50px] lg:px-[20px] lg:py-[15px] h-[45px] px-[20px] py-[14px] rounded-lg lg:text-[16px] text-[14px] text-[${textColor}] font-medium bg-[${backGroundColor}] cursor-pointer ${
          selected ? `hover:[#252530]` : `hover:bg-[#2e2e36]`
        }`}
      >
        {icon && icon}
        {placeholder}
      </div>
    </Link>
  );
};

export default CategoryTab;
