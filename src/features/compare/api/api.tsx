import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (category) params.append("category", category.toString());
    if (order) params.append("order", order);
    if (cursor) params.append("cursor", cursor.toString());
    if ([...params].length > 0) url += `?${params.toString()}`;
    return axios.get(url);
  }

  getProductsId(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`);
  }

  getStats(teamId: string, productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`);
  }
}

export const productService = new ProductService();