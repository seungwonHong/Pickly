import { productService } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductSort(
  keyword?: string,
  category?: number,
  order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount",
  cursor?: number
) {
  const productQuery = useQuery({
    queryKey: ["productReviews", keyword, category, order, cursor],
    queryFn: () =>
      productService.getProducts({ keyword, category, order, cursor }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return productQuery;
}
