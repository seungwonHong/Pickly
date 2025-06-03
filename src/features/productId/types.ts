export interface GetProductIdReviews {
  nextCursor: number;
  list: GetProductIdDetail[];
}

export interface GetProductIdReviewsDetail {
  user: {
    image: string;
    nickname: string;
    id: number;
  };
  reviewImages: {
    source: string;
    id: number;
  }[];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
}

export interface GetProductIdDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}
