import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserData = {
  id: number;
  nickname: string;
};

type UserState = {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data: UserData) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "user-storage",
      storage:
        typeof window !== "undefined" &&
        window.location.hostname === "localhost"
          ? createJSONStorage(() => localStorage) // 개발시 로컬
          : createJSONStorage(() => sessionStorage), // 배포시 세션
    }
  )
);
