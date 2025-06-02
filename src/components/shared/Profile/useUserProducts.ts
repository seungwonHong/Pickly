// hooks/useUserProducts.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import apiInstance from "@/lib/axios/index";
import type { InfiniteData } from "@tanstack/react-query";

export type ProductTabType = "created" | "reviewed" | "favorite";

interface Product {
  id: number;
  name: string;
  image: string;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
}

interface ProductApiResponse {
  list: Product[];
  nextCursor: number;
}

export function useUserProducts({
  userId,
  type,
}: {
  userId: number;
  type: ProductTabType;
}) {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery<ProductApiResponse>({
    queryKey: ["user-products", userId, type],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await apiInstance.get(`/users/${userId}/${type}-products`, {
        params: { cursor: pageParam },
      });
      console.log("응답 받음:", res.data);
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== 0 ? lastPage.nextCursor : undefined,
    enabled: userId > 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [inView, query.hasNextPage, query.isFetchingNextPage]);

  return {
    ...query,
    products:
      (
        query.data as unknown as InfiniteData<ProductApiResponse>
      )?.pages.flatMap((page) => page.list) ?? [],
    ref,
  };
}
