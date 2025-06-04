import { useQuery } from "@tanstack/react-query";
import { productService } from "../api";
import { useParams } from "next/navigation";

export function useGetProductsIdReviews() {
  const { id } = useParams();
  const { data: reviews } = useQuery({
    queryKey: ["productIdReviews", id],
    queryFn: () =>
      productService.getProductsIdReviews(Number(id)).then((res) => res.data),
    select: (data) => data.data,
    enabled: !!id,
  });
  return { reviews };
}
