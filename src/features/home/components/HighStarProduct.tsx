import React from "react";
import { Product } from "../types/productType";
import ProductCard from "@/components/shared/ProductCard";

interface Props {
  products?: Product;
}

const HighStarProduct = ({ products }: Props) => {
  return (
    <div className="grid 2xl:grid-cols-3 grid-cols-2 lg:gap-[20px] gap-[15px] lg:mt-[30px] mt-[30px]">
      {products?.list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HighStarProduct;
