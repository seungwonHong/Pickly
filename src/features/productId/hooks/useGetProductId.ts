import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { productService } from "../api";

export function useGetProductId() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      productService.getProductsId(Number(id)).then((res) => res.data),
    enabled: !!id,
  });

  return {
    product,
    isLoading,
    isError,
    error,
  };
}

export function useGetProductIdGet(productId: number) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      productService.getProductsId(productId).then((res) => res.data),
    enabled: !!productId,
  });

  return {
    product,
    isLoading,
    isError,
    error,
  };
}
