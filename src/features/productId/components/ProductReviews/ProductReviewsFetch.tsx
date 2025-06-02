import ProductReviewsInfinite from "./ProductReviewsInfinite";
import ProductReviewSort from "./ProductReviewSort";

import { productService } from "../../api";

interface ProductIdReviewProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: {
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
  };
}

export default async function ProductReviewsList({
  params,
  searchParams,
}: ProductIdReviewProps) {
  const productId = Number((await params).id);
  const order = searchParams?.order || "recent";

  if (isNaN(productId)) return null;

  const initialData = await productService
    .getProductsIdReviews(productId, order)
    .then((res) => res.data);

  return (
    <div className="mt-[60px]">
      <div className="text-[#f1f1f1] text-[20px] font-semibold flex justify-between mb-[30px]">
        <div>상품리뷰</div>
        {/* SortDropDown 따로 뺌 -> use client 사용해야하기 때문 */}
        <ProductReviewSort />
      </div>
      <ProductReviewsInfinite
        initialData={initialData}
        productId={productId}
        order={order}
      />
    </div>
  );
}
