import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import { productService } from "@/features/productId/api";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductIdPage({ params }: PageProps) {
  const productId = await Number(params.id);

  if (isNaN(productId)) return null;

  const initialData = await productService
    .getProductsIdReviews(productId, "recent")
    .then((res) => res.data);

  return (
    <div>
      <Header />
      <div className="w-[940px] h-auto mx-auto mb-[120px] my-[60px]">
        <ProductIdDetail params={params} />
        <ProductIdStats params={params} />
        <ProductReviewsFetch initialData={initialData} productId={productId} />
      </div>
    </div>
  );
}
