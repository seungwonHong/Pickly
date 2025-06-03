"use client";

import { useState } from "react";

import ProductGrid from "./ProductGrid";
import ProductTabHeader from "./ProductTabHeader";

const tabMap = {
  "리뷰 남긴 상품": "reviewed",
  "등록한 상품": "created",
  "찜한 상품": "favorite",
} as const;

export type TabKo = keyof typeof tabMap;

export default function ProductTabSection({ userId }: { userId: number }) {
  const [selectedTab, setSelectedTab] = useState<TabKo>("리뷰 남긴 상품");

  return (
    <section className="mt-20">
      <ProductTabHeader selected={selectedTab} onChange={setSelectedTab} />
      <ProductGrid type={tabMap[selectedTab]} userId={userId} />
    </section>
  );
}
