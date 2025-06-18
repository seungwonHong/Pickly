"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserData {
  id: number;
  nickname: string;
}

export interface UserProduct {
  id: number;
  name: string;
  image: string;
  writerId: number;
  category: {
    id: number;
    name: string;
  };
}

interface UserState {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;

  compareList: UserProduct[];
  addToCompare: (product: UserProduct) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;

  selectedCompareProductId: number | null;
  setSelectedCompareProductId: (id: number | null) => void;

  baseCompareProductId: number | null;
  setBaseCompareProductId: (id: number | null) => void;

  groupedCompareList: {
    categoryId: number;
    products: UserProduct[];
  }[];
  setGroupedCompareList: (
    grouped: { categoryId: number; products: UserProduct[] }[]
  ) => void;

  clearAll: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => {
      // 그룹화 함수 분리
      const groupByCategory = (list: UserProduct[]) => {
        const grouped = list.reduce((acc, product) => {
          const categoryId = Number(product.category.id);
          if (!acc[categoryId]) acc[categoryId] = [];
          acc[categoryId].push(product);
          return acc;
        }, {} as Record<number, UserProduct[]>);

        return Object.entries(grouped).map(([categoryId, products]) => ({
          categoryId: Number(categoryId),
          products,
        }));
      };

      return {
        userData: null,
        setUserData: (data) => set({ userData: data }),
        clearUserData: () => set({ userData: null }),

        selectedCompareProductId: null,
        setSelectedCompareProductId: (id) =>
          set({ selectedCompareProductId: id }),

        baseCompareProductId: null,
        setBaseCompareProductId: (id) => set({ baseCompareProductId: id }),

        compareList: [],
        groupedCompareList: [],
        setGroupedCompareList: (grouped) =>
          set({ groupedCompareList: grouped }),

        addToCompare: (product) => {
          const currentCompareList = get().compareList;
          const updatedCompareList = [...currentCompareList];
          const existingIndex = updatedCompareList.findIndex(
            (p) => p.id === product.id
          );

          if (existingIndex !== -1) {
            updatedCompareList[existingIndex] = product;
          } else {
            updatedCompareList.push(product);
          }

          const groupedCompareList = groupByCategory(updatedCompareList);
          const newBaseCompareProductId =
            updatedCompareList.length > 0
              ? updatedCompareList[updatedCompareList.length - 1].id
              : null;

          set({
            compareList: updatedCompareList,
            baseCompareProductId: newBaseCompareProductId,
            groupedCompareList,
          });
        },

        removeFromCompare: (productId) => {
          const updatedCompareList = get().compareList.filter(
            (p) => p.id !== productId
          );
          const groupedCompareList = groupByCategory(updatedCompareList);
          const newBaseCompareProductId =
            updatedCompareList.length > 0
              ? updatedCompareList[updatedCompareList.length - 1].id
              : null;

          set({
            compareList: updatedCompareList,
            groupedCompareList,
            baseCompareProductId: newBaseCompareProductId,
          });
        },

        clearCompare: () =>
          set({
            compareList: [],
            groupedCompareList: [],
            baseCompareProductId: null,
          }),

        clearAll: () =>
          set({
            userData: null,
            compareList: [],
            groupedCompareList: [],
            baseCompareProductId: null,
            selectedCompareProductId: null,
          }),
      };
    },
    {
      name: "user-storage",
      // 수정한 코드 (서버에서도 안전하게 동작)
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
