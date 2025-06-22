"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import CompareDropdown from "./CompareDropdown";
import useGetUser from "@/features/productId/hooks/useGetUser";
import { productService } from "../api/api";
import { useProductStatsStore } from "@/features/productId/libs/useProductStatsStore";

type Props = {
  label: string;
  tagColor: "green" | "pink";
  onProductSelectId?: (id: number | null) => void;
  onCategorySelect?: (categoryId: number | null) => void;
  excludeId?: number | null;
  defaultProductId?: number | null | undefined;
  setShowResult?: (value: boolean) => void;
  onProductNameChange?: (name: string) => void;
  className?: string;
};

export default function CompareProductInput({
  label,
  tagColor,
  onProductSelectId,
  onCategorySelect,
  excludeId,
  defaultProductId,
  onProductNameChange,
  setShowResult
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { baseCompareProductId, compareList } = useGetUser();

  const {
    setRating,
    setReviewCount,
    setFavoriteCount
  } = useProductStatsStore();

  useEffect(() => {
    if (!selected) {
      const productId = defaultProductId != null ? defaultProductId : baseCompareProductId;

      if (productId != null) {
        productService.getProductsId(productId)
          .then(async (res) => {
            const product = res.data;
            setInputValue(product.name);
            setSelected(true);
            onProductSelectId?.(product.id);
            onCategorySelect?.(product.categoryId);
            onProductNameChange?.(product.name);

            const statsRes = await productService.getStats(product.id);
            const stats = statsRes.data;
            setRating(stats.rating);
            setReviewCount(stats.reviewCount);
            setFavoriteCount(stats.favoriteCount);
          })
          .catch((error) => console.error("상품 정보를 가져오는 중 오류 발생:", error));
      }
    }
  }, [defaultProductId, baseCompareProductId, onProductSelectId, onCategorySelect]);

  const filteredProducts = compareList.filter(
    (product) =>
      product.name.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      product.id !== excludeId
  );

  const showDropdown = !selected && inputValue.trim() !== "" && filteredProducts.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected(false);
  };

  const handleAddProductInternal = (id: number, name: string) => {
    productService.getProductsId(id)
      .then(async (res) => {
        const product = res.data;
        setInputValue(product.name);
        setSelected(true);
        onProductSelectId?.(product.id);
        onCategorySelect?.(product.categoryId);
        onProductNameChange?.(product.name);

        const statsRes = await productService.getStats(product.id);
        const stats = statsRes.data;
        setRating(stats.rating);
        setReviewCount(stats.reviewCount);
        setFavoriteCount(stats.favoriteCount);
      })
      .catch((error) => {
        console.error("제품 상세정보 또는 통계정보 로드 실패:", error);
      });
  };

  const handleDelete = () => {
    setInputValue("");
    setSelected(false);
    onProductSelectId?.(null);
    onCategorySelect?.(null);
    inputRef.current?.focus();
    setShowResult?.(false);
  };

  const tagStyles =
    tagColor === "green"
      ? "bg-[#213639] text-[var(--color-green)]"
      : "bg-[#3A263B] text-[var(--color-pink)]";

  return (
    <div className="flex flex-col w-full lg:max-w-[350px] px-2">
      <label htmlFor="productInput" className="text-[16px] lg:text-base mb-2 font-light text-white">
        {label}
      </label>

      <div className="relative w-full">
        {selected && (
          <div className="absolute z-10 flex items-center space-x-2 top-[13px] left-4">
            <div className={`flex items-center px-3 py-2 rounded-[6px] text-[16px] lg:text-[18px] ${tagStyles}`}>
              {inputValue}
              <button
                onClick={handleDelete}
                className="ml-2 rounded-[5px] bg-[#1F2937] w-5 h-5 flex items-center justify-center text-white text-xs leading-none"
                aria-label="삭제"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className={`relative rounded-[8px] border w-full h-[70px] ${isFocused || showDropdown ? "border-transparent bg-gradient-to-r from-[#5097fa] to-[#5363ff] p-[1px]" : "border-[#353542]"}`}>
          <div className="w-full h-full rounded-[8px] bg-[#252530]">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={selected ? "" : "상품을 입력하세요"}
              readOnly={selected}
              className="w-full h-full border-0 rounded-[8px] bg-transparent text-white placeholder-[var(--color-deepGray)] px-4 pl-[15px] focus:outline-none"
            />
          </div>
        </div>

        {showDropdown && (
          <CompareDropdown
            productList={{ list: filteredProducts }}
            handleAddProduct={handleAddProductInternal}
          />
        )}
      </div>
    </div>
  );
}
