import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
<<<<<<< HEAD

export default async function ProductIdPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key: string]: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
  }>;
}) {
  const productId = Number((await params).id);

  if (isNaN(productId)) return null;
  const sp = await searchParams;

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-999">
=======
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
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        <Header />
      </header>
      <div className="lg:w-[940px] mx-auto lg:mb-[120px] lg:my-[160px] md:w-[684px] w-[335px] md:mt-[140px] md:mb-[147px] mt-[130px] mb-[200px] flex flex-col gap-[60px]">
        <ProductIdDetail productId={productId} />
<<<<<<< HEAD
        <ProductIdStats productId={productId} />
        <ProductReviewsFetch searchParams={sp} productId={productId} />
=======
        <ProductApiDetail productId={productId} />
        <ProductIdStats productId={productId} />
        <ProductReviewsFetch
          searchParams={searchParams}
          productId={productId}
        />
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      </div>
    </div>
  );
}
