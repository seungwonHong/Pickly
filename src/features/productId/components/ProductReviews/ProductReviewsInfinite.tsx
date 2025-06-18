"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { productService } from "../../api";
import { GetProductIdReviewsDetail } from "../../types";

const SpinningWidget = dynamic(
  () => import("@/components/shared/SpinningWidget"),
  {
    loading: () => <p>로딩중입니다...</p>,
  }
);

const ProductReviewsListComponent = dynamic(
  () => import("./ProductReviewsListComponent"),
  { loading: () => <p>로딩중입니다...</p> }
);
interface ProductIdReviewProps {
  nextCursor?: number | null;
  queryKey: [
    string,
    number | string,
    "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined
  ];
  productId: number;
  order: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined;
  initialData?: {
    list: GetProductIdReviewsDetail[];
    nextCursor?: number | null;
  } | null;
}

export default function ProductReviewsInfinite({
  queryKey,
  nextCursor,
  productId,
  order,
  initialData,
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
      initialData: initialData
        ? { pages: [initialData], pageParams: [undefined] }
        : undefined,
    });

  useEffect(() => {
    if (!observerRef.current) return;
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

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div>
        {data?.pages
          .flatMap((page) => page.list)
          .map((review) => (
            <ProductReviewsListComponent key={review.id} review={review} />
          ))}

        {hasNextPage && <div ref={observerRef} className="h-[40px]"></div>}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center w-full mt-[10px]">
          <SpinningWidget />
        </div>
      )}
    </>
  );
}
