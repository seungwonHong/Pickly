import { useState, useEffect } from "react";
import { ProductsResponse } from "../types/product";
import { productService } from "../api/api";

export default function useProductSearch(inputValue: string) {
  const [productList, setProductList] = useState<ProductsResponse>({ list: [] });

  useEffect(() => {
    if (!inputValue) {
      setProductList({ list: [] });
      return;
    }

    productService
      .getProducts({ keyword: inputValue })
      .then((response) => {
        setProductList({ list: response.data.list });
      })
      .catch((error) => {
        console.error("검색 실패:", error);
      });
  }, [inputValue]);

  return productList;
}