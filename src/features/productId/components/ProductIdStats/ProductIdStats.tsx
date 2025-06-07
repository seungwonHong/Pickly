import ProductIdStatsClient from "./ProductIdStatsClient";
import { productService } from "../../api";

export default async function ProductIdStats({
  productId,
}: {
  productId: number;
}) {
  const { data: product } = await productService.getProductsId(productId);
  return <ProductIdStatsClient product={product} />;
}
