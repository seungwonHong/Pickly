import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";

import ProductIdDetailServer from "@/features/productId/components/ProductIdDetail/ProductIdDetailServer";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
import ProductApiDetail from "@/features/productId/components/ProductApi/ProductApiDetail";
import { productService } from "@/features/productId/api";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  return {
    title: `Pickly | ${decodedId}`,
    description: `${decodedId}와 관련된 설명과 리뷰를 Pickly에서 확인해보세요!`,
    openGraph: {
      title: `Pickly | ${decodedId}`,
      description: `${decodedId}와 관련된 모든 설명과 리뷰를 Pickly에서 확인해보세요!`,
    },
  };
}

export default async function ProductIdPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (isNaN(productId)) return null;

  const responseProductId = await productService.getProductsIdReviews(
    productId,
    "recent"
  );
  const initialData = responseProductId.data;

  const response = await productService.getProductsId(productId);
  const product = response.data;

  return (
    <div>
      <div className="lg:w-[940px] mx-auto  lg:mb-[120px] lg:my-[160px] md:w-[684px] w-[335px] md:mt-[140px] md:mb-[147px] mt-[130px] mb-[200px] flex flex-col gap-[60px]">
        <ProductIdDetailServer product={product} />
        <ProductApiDetail product={product} />
        <ProductIdStats product={product} />
        <ProductReviewsFetch
          productId={productId}
          initialData={initialData}
          initialOrder="recent"
        />
      </div>
    </div>
  );
}
