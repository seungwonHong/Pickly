import { create } from "zustand";

interface ProductStatsState {
  rating: Record<number, number>;
  reviewCount: Record<number, number>;
  favoriteCount: Record<number, number>;
  isFavorite: Record<number, boolean>;
  setRating: (productId: number, rating: number) => void;
  setReviewCount: (productId: number, count: number) => void;
  setFavoriteCount: (productId: number, count: number) => void;
  setIsFavorite: (productId: number, isFavorite: boolean) => void;
}

export const useProductIDStatsStore = create<ProductStatsState>((set) => ({
  rating: {},
  reviewCount: {},
  favoriteCount: {},
  isFavorite: {},

  setRating: (productId, rating) =>
    set((state) => ({
      rating: { ...state.rating, [productId]: rating },
    })),

  setReviewCount: (productId, count) =>
    set((state) => ({
      reviewCount: { ...state.reviewCount, [productId]: count },
    })),

  setFavoriteCount: (productId, count) =>
    set((state) => ({
      favoriteCount: { ...state.favoriteCount, [productId]: count },
    })),

  setIsFavorite: (productId, isFavorite) =>
    set((state) => ({
      isFavorite: { ...state.isFavorite, [productId]: isFavorite },
    })),
}));

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
