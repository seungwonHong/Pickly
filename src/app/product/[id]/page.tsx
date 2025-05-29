import ProductIdStats from "@/features/productId/components/ProductIdStats";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductIdPage({ params }: PageProps) {
  return (
    <div>
      <div className="w-[940px] h-[1687px] mx-auto my-[60px]">
        <ProductIdStats params={params} />
      </div>
    </div>
  );
}
