"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
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
  const observerRef = useRef(null);

  // useInfiniteQuery를 사용하여 무한 스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      GetProductIdReviews,
      Error,
      InfiniteData<GetProductIdReviews, number | undefined>,
      readonly (string | number | undefined)[],
      number | undefined
    >({
      queryKey: ["reviews", productId, order],
      queryFn: ({ pageParam }) =>
        productService
          .getProductsIdReviews(productId, order, pageParam)
          .then((res) => res.data),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
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
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
  }, [observerRef, hasNextPage, isFetchingNextPage, order]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div
          key={i}
          className="flex flex-col md:gap-[20px] gap-[15px] md:mb-[20px] mb-[15px]"
        >
          {page?.list?.map((review) => (
            <ProductReviewsListComponent key={review.id} review={review} />
          ))}
        </div>
      ))}

      {hasNextPage && <div ref={observerRef} className="h-[40px]"></div>}
      {isFetchingNextPage && <p>로딩 중...</p>}
    </div>
  );
}
