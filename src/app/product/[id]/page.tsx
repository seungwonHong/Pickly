import Header from "@/components/shared/Header";
import ProductIdReview from "@/features/productId/components/ProductIdReview";

export default function ProductIdPage() {
  return (
    <div>
      <Header />
      <div className="w-[940px] h-[1687px] mx-auto my-[60px]">
        <ProductIdReview />
      </div>
    </div>
  );
}
