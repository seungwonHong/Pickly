import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
interface PageProps {
  params: {
    id: string;
  };
  searchParams: { order?: string };
}

export default function ProductIdPage({ params, searchParams }: PageProps) {
  return (
    <div>
      <Header />
      <div className="w-[940px] h-auto mx-auto mb-[120px] my-[60px]">
        <ProductIdDetail params={params} />
        <ProductIdStats params={params} />
        <ProductReviewsFetch params={params} searchParams={searchParams} />
      </div>
    </div>
  );
}
