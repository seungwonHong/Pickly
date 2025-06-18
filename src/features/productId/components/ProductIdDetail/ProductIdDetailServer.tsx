import ProductIdDetail from "./ProductIdDetail";
import { productService } from "../../api";

export default async function ProductIdDetailServer({
  productId,
}: {
  productId: number;
}) {
  const response = await productService.getProductsId(productId);
  const product = response.data;

  return <ProductIdDetail product={product} />;
}
