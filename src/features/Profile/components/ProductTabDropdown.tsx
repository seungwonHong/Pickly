"use client";

import { useState, useRef, useEffect } from "react";
import { TabKo } from "./ProductTabSection";
import Image from "next/image";
import SortArrow from "../../../../public/icons/sort-arrow.png";

interface ProductTabDropdownProps {
  options: TabKo[];
  selected: TabKo;
  onChange: (value: TabKo) => void;
}

export default function ProductTabDropdown({
  options,
  selected,
  onChange,
}: ProductTabDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[140px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full p-1 pr-0 text-left  text-white font-semibold text-[18px]  cursor-pointer   rounded-[8px] transition-colors duration-100 hover:bg-[#2F2F37]  flex gap-1"
      >
        {selected}
        <Image
          src={SortArrow}
          alt="Arrow"
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-[#1C1C22] border border-[#353542] rounded-[8px] z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`p-2 text-white hover:bg-[#2A2A2F] cursor-pointer ${
                option === selected
                  ? "bg-[#252530] text-[#F1F1F5] font-bold"
                  : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
