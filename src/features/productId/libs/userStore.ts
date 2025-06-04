import { create } from "zustand";

interface UserStore {
  userId: number | null;
  email: string | null;
  setUser: (user: { userId: number; email: string }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  email: null,
  setUser: (user) =>
    set((state) => ({
      ...state,
      userId: user.userId,
      email: user.email,
    })),
  resetUser: () => set({ userId: null, email: null }),
}));
