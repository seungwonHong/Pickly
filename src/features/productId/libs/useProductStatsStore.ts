import { create } from "zustand";

interface ProductStats {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  isFavorite: boolean;
  setRating: (rating: number) => void;
  setReviewCount: (reviewCount: number) => void;
  setFavoriteCount: (favoriteCount: number) => void;
  setIsFavorite?: (isFavorite: boolean) => void;
}

export const useProductStatsStore = create<ProductStats>((set) => ({
  rating: 0,
  reviewCount: 0,
  favoriteCount: 0,
  isFavorite: false,
  setRating: (rating) => set({ rating }),
  setReviewCount: (reviewCount) => set({ reviewCount }),
  setFavoriteCount: (favoriteCount) => set({ favoriteCount }),
  setIsFavorite: (isFavorite) => set({ isFavorite }),
}));
