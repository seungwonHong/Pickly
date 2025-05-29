"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../../api";

interface Props {
  productId: number;
}

export default function ProductReviewsListComponent({ productId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", productId],
      queryFn: ({ pageParam = undefined }) =>
        productService
          .getProductsIdReviews(productId, "recent", pageParam)
          .then((res) => res.data),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    });

  return (
    <div>
      {data?.pages.map((page) =>
        page.list.map((review: any) => (
          <div key={review.id}>{review.content}</div>
        ))
      )}
      {hasNextPage && !isFetchingNextPage && (
        <button onClick={() => fetchNextPage()}>더 보기</button>
      )}
    </div>
  );
}
