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
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
      selectedCompareProductId: null,
      setSelectedCompareProductId: (id) =>
        set({ selectedCompareProductId: id }),
      baseCompareProductId: null,
      setBaseCompareProductId: (id) => set({ baseCompareProductId: id }),
      compareList: [],
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
        set({
          compareList: newCompareList,
          baseCompareProductId: lastTwo[0]?.id ?? null,
          selectedCompareProductId: lastTwo[1]?.id ?? lastTwo[0]?.id ?? null,
        });
      },
      removeFromCompare: (productId) => {
        const filtered = get().compareList.filter((p) => p.id !== productId);
        set({ compareList: filtered });
      },
      clearCompare: () => set({ compareList: [] }),
      clearAll: () =>
        set({
          userData: null,
          compareList: [],
          baseCompareProductId: null,
          selectedCompareProductId: null,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
