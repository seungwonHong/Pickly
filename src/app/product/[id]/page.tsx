import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";

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
        <Header />
      </header>
      <div className="lg:w-[940px] mx-auto lg:mb-[120px] lg:my-[160px] md:w-[684px] w-[335px] md:mt-[140px] md:mb-[147px] mt-[130px] mb-[200px] flex flex-col gap-[60px]">
        <ProductIdDetail productId={productId} />
        <ProductIdStats productId={productId} />
        <ProductReviewsFetch searchParams={sp} productId={productId} />
      </div>
    </div>
  );
}
