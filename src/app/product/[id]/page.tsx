import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewClient from "@/features/productId/components/ProductReviews/ProductReviewClient";

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = Number((await params).id);
  if (isNaN(productId)) return null;

  return (
    <div>
      <Header />
      <div className="w-[940px] mx-auto mb-[120px] my-[60px]">
        <ProductIdDetail productId={productId} />
        <ProductIdStats productId={productId} />
        <ProductReviewClient productId={productId} />
      </div>
    </div>
  );
}
