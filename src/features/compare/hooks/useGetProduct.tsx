import axios from "axios";
import { useEffect, useState } from "react";
import { productService } from "../api/api";
export default function useProductSearch(teamId: string, productId: number) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const data=productService.getProducts({keyword, category, order, cursor})
    console.log(data)
  }, []);

  return product;
}
