"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { getProducts } from "../services/getProduct";
import SpinningWidget from "@/components/shared/SpinningWidget";
import ProductCard from "@/components/shared/ProductCard";

interface Props {
  nextCursor?: number | null;
  categoryId?: number;
  queryKey: [
    string,
    number | string,
    "recent" | "rating" | "reviewCount" | undefined
  ];
  keyword?: string;
  order?: "recent" | "rating" | "reviewCount";
}

const MoreProducts = ({
  nextCursor,
  categoryId,
  queryKey,
  keyword,
  order,
}: Props) => {
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        getProducts({
          cursor: pageParam ?? undefined,
          order: order,
          categoryId,
          keyword: keyword,
        }),
      initialPageParam: nextCursor,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 30px 0px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if ((nextCursor === null && keyword === undefined) || keyword === "") return;

  return (
    <>
      <div className="grid 2xl:grid-cols-3 grid-cols-2 lg:gap-[20px] gap-[15px] lg:mt-[20px] mt-[15px]">
        {data?.pages
          .flatMap((page) => page.list)
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}

        {/* 관찰 요소: 항상 그리드 안에 남겨두기 */}
        {hasNextPage && <div ref={observerRef} className="h-[40px]"></div>}
      </div>

      {/* 스피너도 별도 위치에 렌더 -> grid 높이는 변하지 않음 */}
      {isFetchingNextPage && (
        <div className="flex justify-center w-full mt-[10px]">
          <SpinningWidget />
        </div>
      )}
    </>
  );
};

export default MoreProducts;
