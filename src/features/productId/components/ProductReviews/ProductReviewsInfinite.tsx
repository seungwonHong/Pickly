"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import ProductReviewsListComponent from "./ProductReviewsListComponent";
import { productService } from "../../api";
import { GetProductIdReviews } from "../../types";

interface ProductIdReviewProps {
  initialData?: GetProductIdReviews;
  productId: number;
  order: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined;
}

export default function ProductReviewsInfinite({
  initialData,
  productId,
  order,
}: ProductIdReviewProps) {
  const ref = useRef(null);

  // useInfiniteQuery를 사용하여 무한 스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", productId, order],
      queryFn: ({ pageParam = undefined }) =>
        productService
          .getProductsIdReviews(productId, order, pageParam)
          .then((res) => res.data),
      getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
      keepPreviousData: true,
      ...(order === "recent" && initialData
        ? {
            initialData: {
              pages: [initialData],
              pageParams: [undefined],
            },
          }
        : {}),
    });

  // IntersectionObserver를 사용하여 스크롤이 마지막 요소에 도달했을 때 다음 페이지를 가져옴
  useEffect(() => {
    if (!ref.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, hasNextPage, isFetchingNextPage, order]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-col gap-[20px] mb-[20px]">
          {page?.list?.map((review) => (
            <ProductReviewsListComponent key={review.id} review={review} />
          ))}
        </div>
      ))}

      <div ref={ref} />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </div>
  );
}
