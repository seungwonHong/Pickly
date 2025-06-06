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
    categoryId: string;
    products: UserProduct[];
  }[];
  setGroupedCompareList: (
    grouped: { categoryId: string; products: UserProduct[] }[]
  ) => void;

  clearAll: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => {
      // 그룹화 함수 분리
      const groupByCategory = (list: UserProduct[]) => {
        const grouped = list.reduce((acc, product) => {
          const categoryId = String(product.category.id);
          if (!acc[categoryId]) acc[categoryId] = [];
          acc[categoryId].push(product);
          return acc;
        }, {} as Record<string, UserProduct[]>);

        return Object.entries(grouped).map(([categoryId, products]) => ({
          categoryId,
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
          const current = get().compareList;
          const existingIndex = current.findIndex((p) => p.id === product.id);

          const newCompareList = [...current];
          if (existingIndex !== -1) {
            newCompareList[existingIndex] = product;
          } else {
            newCompareList.push(product);
          }

          const lastTwo = newCompareList.slice(-2);
          const groupedCompareList = groupByCategory(newCompareList);

          set({
            compareList: newCompareList,
            baseCompareProductId: lastTwo[0]?.id ?? null,
            groupedCompareList,
          });
        },

        removeFromCompare: (productId) => {
          const filtered = get().compareList.filter((p) => p.id !== productId);
          const groupedCompareList = groupByCategory(filtered);

          set({
            compareList: filtered,
            groupedCompareList,
          });
        },

        clearCompare: () => set({ compareList: [], groupedCompareList: [] }),

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
