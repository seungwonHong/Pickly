"use client";

import { HydrationBoundary } from "@tanstack/react-query";
import ProductReviewsListComponent from "./ProductReviewsListComponent";

interface Props {
  state: unknown;
  productId: number;
}

export default function ProductReviewsHydration({ state, productId }: Props) {
  return (
    <HydrationBoundary state={state}>
      <ProductReviewsListComponent productId={productId} />
    </HydrationBoundary>
  );
}
