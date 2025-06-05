import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import apiInstance from "@/lib/axios";
import { Product, ProductApiResponse, ProductTabType } from "../types/user";

export function useUserProducts({
  userId,
  type,
  initialData,
}: {
  userId: number;
  type: ProductTabType;
  initialData?: Product[];
}) {
  const { ref, inView } = useInView();

  const query = useInfiniteQuery<ProductApiResponse, Error>({
    queryKey: ["user-products", userId, type],
    queryFn: async ({ pageParam = 0 }) => {
      const url = `/users/${userId}/${type}-products`;
      const res = await apiInstance.get(url, {
        params: pageParam !== 0 ? { cursor: pageParam } : undefined,
      });
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== 0 ? lastPage.nextCursor : undefined,
    initialData:
      initialData !== undefined
        ? {
            pages: [
              {
                list: initialData,
                nextCursor: 0,
              },
            ],
            pageParams: [0],
          }
        : undefined,
    enabled: !!userId,
  });

  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [inView, query.hasNextPage, query.isFetchingNextPage]);

  const products: Product[] =
    query.data?.pages.flatMap((page) => page.list) ?? [];

  return {
    ...query,
    products,
    ref,
  };
}
