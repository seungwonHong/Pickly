import ProductIdDetail from "./ProductIdDetail";
import { GetProductIdDetail } from "@/features/productId/types";

export default async function ProductIdDetailServer({
  product,
}: {
  product: GetProductIdDetail;
}) {
  return <ProductIdDetail product={product} />;
}
