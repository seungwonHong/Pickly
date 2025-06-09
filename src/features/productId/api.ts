import axiosInstance from "./axiosInstance";
import axios from "axios";

const BaseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api/proxy";
// 로그인시 지워야 함, 좋아요버튼 테스트 용

class ProductService {
  getProducts({
    keyword,
    category,
    order,
    cursor,
  }: {
    keyword?: string;
    category?: number;
    order?: "recent" | "rating" | "reviewCount";
    cursor?: number;
  }) {
    let url = `${BaseURL}/products`;
    if (keyword) url += `?keyword=${keyword}`;
    if (category) url += `&category=${category}`;
    if (order) url += `&order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;
    return axios.get(url);
  }

  getProductsId(productId: number) {
    return axios.get(`${BaseURL}/products/${productId}`);
  }
  getProductsIdReviews(
    productId: number,
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined,
    cursor?: number
  ) {
    let url = `${BaseURL}/products/${productId}/reviews`;

    if (order) url += `?order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;

    return axios.get(url);
  }

  postProductsFavorite(productId: number) {
    return axiosInstance.post(`/products/${productId}/favorite`, {});
  }

  deleteProductsFavorite(productId: number) {
    return axiosInstance.delete(`/products/${productId}/favorite`);
  }
}

class UserService {
  getUser() {
    return axios.get(`${BaseURL}/users/me`);
  }
}

class ReviewService {
  async postReviews({
    productId,
    content,
    rating,
    images,
  }: {
    productId: number;
    content: string;
    rating: number;
    images: string[];
  }) {
    return axiosInstance.post(`/reviews`, {
      productId,
      content,
      rating,
      images,
    });
  }

  postReviewsLike(reviewId: number) {
    return axiosInstance.post(`/reviews/${reviewId}/like`, {});
  }

  deleteReviewsLike(reviewId: number) {
    return axiosInstance.delete(`/reviews/${reviewId}/like`);
  }
}

class ImageService {
  async postImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post<{ url: string }>(
      `/images/upload`,
      formData
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Accept: "application/json",
      //     Authorization: `Bearer ${TOKEN}`,
      //   },
      // }
    );

    return response.data.url;
  }
}
export const productService = new ProductService();
export const userService = new UserService();
export const reviewService = new ReviewService();
export const imageService = new ImageService();
