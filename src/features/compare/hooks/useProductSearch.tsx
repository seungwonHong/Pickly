import { useState, useEffect } from "react";
import axios from "axios";
import { ProductsResponse } from "../types/product";

export default function useProductSearch(teamId: string, inputValue: string) {
  const [productList, setProductList] = useState<ProductsResponse>({ list: [] });

  useEffect(() => {
    if (!inputValue) {
      setProductList({ list: [] });
      return;
    }

    axios
      .get(`https://mogazoa-api.vercel.app/${"14-6"}/products`)
      .then((response) => {
        const filteredList = response.data.list.filter((product: { name: string }) =>
          product.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setProductList({ list: filteredList });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [teamId, inputValue]);

  return productList;
}