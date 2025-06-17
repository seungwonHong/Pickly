import axiosInstance from "./axiosInstance";
import axios from "axios";

<<<<<<< HEAD
const BaseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api/proxy";
// 로그인시 지워야 함, 좋아요버튼 테스트 용
=======
const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518

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

<<<<<<< HEAD
  getProductsId(productId: number) {
    return axios.get(`${BaseURL}/products/${productId}`);
=======
  getProductsId(productId: number, accessToken?: string) {
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};
    return axios.get(`${BaseURL}/products/${productId}`, { headers });
  }

  patchProductsId({
    productId,
    categoryId,
    image,
    description,
    name,
    accessToken,
  }: {
    productId: number;
    name: string;
    description: string;
    categoryId: number;
    image: string;
    accessToken: string;
  }) {
    return axios.patch(
      `${BaseURL}/products/${productId}`,
      {
        name: name ?? "",
        description: description ?? "",
        categoryId: categoryId ?? 0,
        image: image ?? "",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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

<<<<<<< HEAD
  postProductsFavorite(productId: number) {
    return axiosInstance.post(`/products/${productId}/favorite`, {});
  }

  deleteProductsFavorite(productId: number) {
    return axiosInstance.delete(`/products/${productId}/favorite`);
=======
  postProductsFavorite(productId: number, accessToken: string) {
    return axios.post(
      `${BaseURL}/products/${productId}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  deleteProductsFavorite(productId: number, accessToken: string) {
    return axios.delete(`${BaseURL}/products/${productId}/favorite`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  }
}

class UserService {
  getUser() {
    return axios.get(`${BaseURL}/users/me`);
<<<<<<< HEAD
=======
  }
  getUserIdFavoriteProduct(userId: number) {
    return axios.get(`${BaseURL}/users/${userId}/favorite-products`);
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  }
}

class ReviewService {
  async postReviews({
    productId,
    content,
    rating,
    images,
    accessToken,
  }: {
    productId: number;
    content: string;
    rating: number;
    images: string[];
<<<<<<< HEAD
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
=======
    accessToken: string;
  }) {
    return axios.post(
      `${BaseURL}/reviews`,
      {
        productId,
        content,
        rating,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  deleteReviews(reviewId: number, accessToken: string) {
    return axios.delete(`${BaseURL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  patchReviews({
    reviewId,
    content,
    rating,
    images,
    accessToken,
  }: {
    reviewId: number;
    content: string;
    rating: number;
    images: string[];
    accessToken: string;
  }) {
    return axios.patch(
      `${BaseURL}/reviews/${reviewId}`,
      {
        content,
        rating,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  postReviewsLike(reviewId: number) {
    return axios.post(`${BaseURL}/reviews/${reviewId}/like`, {});
  }

  deleteReviewsLike(reviewId: number) {
    return axios.delete(`${BaseURL}/reviews/${reviewId}/like`);
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  }
}

class ImageService {
<<<<<<< HEAD
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
=======
  async postImage(file: File, accessToken: string): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<{ url: string }>(
      `${BaseURL}/images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
    );

    return response.data.url;
  }
}
export const productService = new ProductService();
export const userService = new UserService();
export const reviewService = new ReviewService();
export const imageService = new ImageService();
