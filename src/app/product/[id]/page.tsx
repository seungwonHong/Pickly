
import ProductIdStats from "@/features/productId/components/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdReview from "@/features/productId/components/ProductIdReview";


interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductIdPage({ params }: PageProps) {
  return (
    <div>
      <Header />
      <div className="w-[940px] h-[1687px] mx-auto my-[60px]">
        <ProductIdReview params={params} />
         <ProductIdStats params={params} />

      </div>
    </div>
  );
}
