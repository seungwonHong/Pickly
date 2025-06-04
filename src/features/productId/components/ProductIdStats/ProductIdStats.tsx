import ProductIdStatsClient from "./ProductIdStatsClient";
import { productService } from "../../api";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductIdStats({ params }: PageProps) {
  const { data: product } = await productService.getProductsId(
    Number(params.id)
  );
  return <ProductIdStatsClient product={product} />;
}
