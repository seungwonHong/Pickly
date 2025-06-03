import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

class ProductService {
  getProducts({
    keyword,
    category,
    order,
    cursor,
  }: {
    keyword?: string;
    category?: number;
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
    cursor?: number;
  }) {
    let url = `${BASE_URL}/products`;
    if (keyword) url += `?keyword=${keyword}`;
    if (category) url += `&category=${category}`;
    if (order) url += `&order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;
    return axios.get(url);
  }

  getProductsId(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`);
  }

}

export const productService = new ProductService();

