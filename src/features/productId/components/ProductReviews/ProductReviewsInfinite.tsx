"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";

import SpinningWidget from "@/components/shared/SpinningWidget";
import ProductReviewsListComponent from "./ProductReviewsListComponent";
import { productService } from "../../api";
import { GetProductIdReviewsDetail } from "../../types";

interface ProductIdReviewProps {
  nextCursor?: number | null;
  queryKey: [
    string,
    number | string,
    "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined
  ];
  productId: number;
  order: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined;
}

export default function ProductReviewsInfinite({
  queryKey,
  nextCursor,
  productId,
  order,
}: ProductIdReviewProps) {
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        productService
          .getProductsIdReviews(productId, order, pageParam)
          .then((res) => res.data),
      initialPageParam: nextCursor ?? undefined,
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
      <div>
        {data?.pages.map((page, i) => (
          <div
            key={i}
            className="flex flex-col md:gap-[20px] gap-[15px] md:mb-[20px] mb-[15px]"
          >
            {page?.list?.map((review: GetProductIdReviewsDetail) => (
              <ProductReviewsListComponent key={review.id} review={review} />
            ))}
          </div>
        ))}

        {hasNextPage && <div ref={observerRef} className="h-[40px]"></div>}
        {isFetchingNextPage && <p>로딩 중...</p>}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center w-full mt-[10px]">
          <SpinningWidget />
        </div>
      )}
    </>
  );
}
