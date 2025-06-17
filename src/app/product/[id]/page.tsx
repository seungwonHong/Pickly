import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
import ProductApiDetail from "@/features/productId/components/ProductApi/ProductApiDetail";
import { Metadata } from "next";

interface PageProps {
  params: { id: string };
  searchParams: {
    [key: string]: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const decodedId = decodeURIComponent(params.id);
  return {
    title: `Pickly | ${decodedId}`,
    description: `${decodedId}와 관련된 설명과 리뷰를 Pickly에서 확인해보세요!`,
    openGraph: {
      title: `Pickly | ${decodedId}`,
      description: `${decodedId}와 관련된 모든 설명과 리뷰를 Pickly에서 확인해보세요!`,
    },
  };
}

export default async function ProductIdPage({
  params,
  searchParams,
}: PageProps) {
  const productId = Number(params.id);

  if (isNaN(productId)) return null;

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </header>
      <div className="lg:w-[940px] mx-auto lg:mb-[120px] lg:my-[160px] md:w-[684px] w-[335px] md:mt-[140px] md:mb-[147px] mt-[130px] mb-[200px] flex flex-col gap-[60px]">
        <ProductIdDetail productId={productId} />
        <ProductApiDetail productId={productId} />
        <ProductIdStats productId={productId} />
        <ProductReviewsFetch
          searchParams={searchParams}
          productId={productId}
        />
      </div>
    </div>
  );
}
