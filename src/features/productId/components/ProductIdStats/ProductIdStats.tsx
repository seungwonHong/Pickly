import ProductIdStatsClient from "./ProductIdStatsClient";

import { GetProductIdDetail } from "@/features/productId/types";

export default async function ProductIdStats({
  product,
}: {
  product: GetProductIdDetail;
}) {
  return <ProductIdStatsClient product={product} />;
}
