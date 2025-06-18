export interface User {
  id: number;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  mostFavoriteCategory: {
    id: number;
    name: string;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
  isMe: boolean;
}

export type ProductTabType = "reviewed" | "created" | "favorite";

export interface Product {
  categoryId: number;
  reviewCount: number;
  favoriteCount: number;
  rating: number;
  id: number;
  name: string;
  image: string;
}

export interface ProductApiResponse {
  list: Product[];
  nextCursor: number;
}
