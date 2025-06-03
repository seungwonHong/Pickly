import { productService } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductSort(
  productId: number,
  order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount",
  cursor?: number
) {
  return useQuery({
    queryKey: ["productReviews", productId, order, cursor],
    queryFn: () =>
      productService.getProductsIdReviews(productId, order, cursor),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
