import { productService } from "@/features/productId/api";
import ProductReviewsFetch from "./ProductReviewsFetch";

interface Props {
  productId: number;
}

export default async function ProductReviewClient({ productId }: Props) {
  const initialOrder = "recent";

  const initialData = await productService
    .getProductsIdReviews(productId, "recent")
    .then((res) => res.data);

  if (!initialData) return <p className="text-gray-400">리뷰 로딩 중...</p>;

  return (
    <ProductReviewsFetch
      initialData={initialData}
      productId={productId}
      initialOrder={initialOrder}
    />
  );
}
