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
  const resolvedSearchParams = await searchParams;
  const sort = resolvedSearchParams?.sort ?? "recent";

  const initialData = await productService
    .getProductsIdReviews(productId, sort)
    .then((res) => res.data);

  return (
    <div>
      <div className="text-[#f1f1f1]  lg:text-[20px] text-[16px] font-medium flex justify-between ">
        <ProductReviewSort sort={sort} />
      </div>

      <ProductReviewClient initialData={initialData} />
      {initialData.nextCursor && (
        <div className="w-full">
          <ProductReviewsInfinite
            nextCursor={initialData?.nextCursor}
            productId={productId}
            queryKey={["reviews", productId, sort]}
            order={sort}
            initialData={initialData}
          />
        </div>
      )}
      {initialData.list.length === 0 && (
        <div className="text-[#f1f1f1] text-[16px] font-normal text-center pt-[80px]">
          <div className="w-full text-[#6E6E82] lg:text-[20px] md:text-[18px] text-[16px] font-medium">
            첫 리뷰를 작성해보세요!
          </div>
        </div>
      )}
    </div>
  );
}
