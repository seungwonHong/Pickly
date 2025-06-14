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
  selected: string | undefined;
  onChange: (value: string) => void;
}

const SortDropDown = ({ selectList, selected, onChange }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  // 외부 클릭 시 드롭다운 닫기
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
        className="md:w-[200px] w-[155px] h-[24px] p-[20px] cursor-pointer flex items-center justify-between gap-[5px] text-[#6E6E82] md:text-[16px] text-[14px] hover:bg-[#252530]  rounded-[8px] transition-colors duration-100"
        onClick={toggleDropdown}
      >
        {selectList.find((item) => item.value === selected)?.name}
        <Image
          src={SortArrow}
          alt="Arrow"
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>

      {shouldRender && (
        <ul
          className={`absolute left-0 top-[46px] md:w-full  w-[151px] z-30  rounded-[8px] bg-[#353742de] 
          flex flex-col items-center justify-around list-none md:p-[10px] p-[5px] gap-[5px]
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {selectList.map((item) => {
            const isSelected = item.value === selected;
            return (
              <li
                key={item.value}
                className={`w-full px-[20px] py-[5px] cursor-pointer flex items-center rounded-[8px] transition-colors duration-100
                ${
                  isSelected
                    ? "bg-[#252530] text-[#F1F1F5]"
                    : "text-[#6E6E82] hover:bg-[#252530]"
                } md:text-[16px] text-[14px]`}
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
