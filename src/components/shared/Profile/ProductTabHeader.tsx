"use client";

// import { useState } from 'react'
// import { cn } from '@/lib/utils' // Tailwind 클래스 병합 유틸리티
import { TabKo } from "./ProductTabSection";

const TABS: TabKo[] = ["리뷰 남긴 상품", "등록한 상품", "찜한 상품"];

interface Props {
  selected: TabKo;
  onChange: (value: TabKo) => void;
}

export default function ProductTabHeader({ selected, onChange }: Props) {
  return (
    <div className="w-full mb-6">
      {/* 데스크탑 탭 */}
      <div className="hidden lg:flex gap-15">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={
              selected === tab ? "text-white font-semibold" : "text-[#6E6E82] "
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 모바일 드롭다운 */}
      <div className="lg:hidden">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as TabKo)}
          className="w-[140px] p-2 font-semibold text-[18px]  text-white "
        >
          {TABS.map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
