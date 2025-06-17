export const getProductReviewsKey = (
  productId: number,
  sort: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" = "recent"
) => ["product-reviews", productId, sort] as const;
