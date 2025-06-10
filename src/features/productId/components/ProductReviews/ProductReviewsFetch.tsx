import ProductReviewSort from "./ProductReviewSort";
import ProductReviewsInfinite from "./ProductReviewsInfinite";

import { productService } from "../../api";
import ProductReviewClient from "./ProductReviewClient";

interface ProductReviewsClientProps {
  productId: number;
  searchParams: {
    [key: string]: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
  };
}

export default async function ProductReviewsFetch({
  productId,
  searchParams,
}: ProductReviewsClientProps) {
  const sort = searchParams?.sort ?? "recent";

  const initialData = await productService
    .getProductsIdReviews(productId, sort)
    .then((res) => res.data);

  return (
    <div>
      <div className="text-[#f1f1f1]  lg:text-[20px] text-[16px] font-medium flex justify-between mb-[30px]">
        <ProductReviewSort />
      </div>

      <ProductReviewClient initialData={initialData} />
      <div className="w-full">
        <ProductReviewsInfinite
          nextCursor={initialData?.nextCursor}
          productId={productId}
          queryKey={["reviews", productId, sort]}
          order={sort}
        />
      </div>
    </div>
  );
}
