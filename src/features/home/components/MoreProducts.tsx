"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { getProducts } from "../services/getProduct";
import SpinningWidget from "@/components/shared/SpinningWidget";
import ProductCard from "@/components/shared/ProductCard";

interface Props {
  nextCursor: number | null;
  categoryId?: number;
  queryKey: [string, number];
}

const MoreProducts = ({ nextCursor, categoryId, queryKey }: Props) => {
  const observerRef = useRef(null);
  if (nextCursor === null) return;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        getProducts({
          cursor: pageParam ?? undefined,
          order: "recent",
          categoryId,
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

  return (
    <>
      {isFetchingNextPage ? (
        <div className="flex justify-center w-full">
          <SpinningWidget />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-[20px] gap-[15px] lg:mt-[20px] mt-[15px]">
          {data?.pages
            .flatMap((page) => page.list)
            .map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          <div ref={observerRef} className="h-[1px]"></div>
        </div>
      )}
    </>
  );
};

export default MoreProducts;
