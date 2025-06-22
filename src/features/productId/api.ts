import axios from "axios";

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
  }

  deleteProductsId(productId: number, accessToken: string) {
    return axios.delete(`${BaseURL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getProductsIdReviews(
    productId: number,
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined,
    cursor?: number,
    accessToken?: string
  ) {
    let url = `${BaseURL}/products/${productId}/reviews`;

    if (order) url += `?order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;

    return axios.get(url, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
  }

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
  }
}

class UserService {
  getUser() {
    return axios.get(`${BaseURL}/users/me`);
  }
  getUserIdFavoriteProduct(userId: number) {
    return axios.get(`${BaseURL}/users/${userId}/favorite-products`);
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
    images: { id?: number; source?: string }[];
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

  postReviewsLike(reviewId: number, accessToken: string) {
    return axios.post(
      `${BaseURL}/reviews/${reviewId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  deleteReviewsLike(reviewId: number, accessToken: string) {
    return axios.delete(`${BaseURL}/reviews/${reviewId}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

class ImageService {
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
    );

    return response.data.url;
  }
}
export const productService = new ProductService();
export const userService = new UserService();
export const reviewService = new ReviewService();
export const imageService = new ImageService();
