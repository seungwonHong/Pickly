import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import ProductReviewsHydration from "./ProductReviewsHydration";
import { productService } from "../../api";

interface ProductIdReviewProps {
  params: { id: string };
}

export default async function ProductReviewsList({
  params,
}: ProductIdReviewProps) {
  const queryClient = new QueryClient();
  const productId = Number(params.id);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["reviews", productId],
    queryFn: ({ pageParam = undefined }) =>
      productService
        .getProductsIdReviews(productId, "recent", pageParam)
        .then((res) => res.data),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });

  return (
    <ProductReviewsHydration
      state={dehydrate(queryClient)}
      productId={productId}
    />
  );
}
