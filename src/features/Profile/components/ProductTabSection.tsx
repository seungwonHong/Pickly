"use client";

import { useState } from "react";
import ProductTabHeader from "./ProductTabHeader";
import { Product, ProductTabType } from "../types/user";
import ProductGrid from "./ProductGrid";

const tabMap = {
  "리뷰 남긴 상품": "reviewed",
  "등록한 상품": "created",
  "찜한 상품": "favorite",
} as const;

interface Props {
  userId: number;
  initialTab: ProductTabType;
  initialProducts: Product[];
}

export type TabKo = keyof typeof tabMap;

export default function ProductTabSection({
  userId,
  initialTab,
  initialProducts,
}: Props) {
  const [selectedTab, setSelectedTab] = useState<ProductTabType>(initialTab);
  const tabKo = Object.entries(tabMap).find(
    ([, v]) => v === selectedTab
  )?.[0] as TabKo | undefined;

  return (
    <section className="mt-20 w-full">
      <ProductTabHeader
        selected={tabKo ?? "리뷰 남긴 상품"}
        onChange={(tabKo: TabKo) => setSelectedTab(tabMap[tabKo])}
      />
      <ProductGrid
        userId={userId}
        type={selectedTab}
        initialProducts={
          selectedTab === initialTab ? initialProducts : undefined
        }
      />
    </section>
  );
}
