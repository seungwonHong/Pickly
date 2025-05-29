"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SortArrow from "../../../public/icons/sort-arrow.png";
interface OptionType {
  name: string;
  value: string;
}

interface DropDownProps {
  selectList: OptionType[];
  selected: string;
  onChange: (value: string) => void;
}

const SortDropDown = ({ selectList, selected, onChange }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  // 바깥 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <div
        className="w-[200px]  h-[24px] px-[20px]  cursor-pointer flex items-center justify-between text-[#6E6E82]"
        onClick={toggleDropdown}
      >
        {selectList.find((item) => item.value === selected)?.name}
        <Image
          src={SortArrow}
          alt="Arrow"
          className={`cursor-pointer transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <ul className="absolute top-[34px] w-full border z-10 flex flex-col items-center justify-around list-none p-[10px] gap-[5px] border-[#626282] rounded-[8px] bg-[#252530] ">
          {selectList.map((item) => {
            const isSelected = item.value === selected;
            return (
              <li
                key={item.value}
                className={`w-[180px] px-[20px] py-[5px] cursor-pointer flex items-center rounded-[8px] transition-colors duration-100
            ${
              isSelected
                ? "bg-[#3A3A48] text-[#F1F1F5] text-[16px]"
                : "text-[#A0A0B0] text-[16px] hover:bg-[#3A3A48] hover:text-white"
            }`}
                onClick={() => handleSelect(item.value)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortDropDown;
