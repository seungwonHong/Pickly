import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewClient from "@/features/productId/components/ProductReviews/ProductReviewClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductIdPage({ params }: PageProps) {
  const productId = Number(params.id);

  if (isNaN(productId)) return null;

  return (
    <div>
      <Header />
      <div className="w-[940px] h-auto mx-auto mb-[120px] my-[60px]">
        <ProductIdDetail params={params} />
        <ProductIdStats params={params} />
        <ProductReviewClient productId={productId} />
      </div>
    </div>
  );
}
