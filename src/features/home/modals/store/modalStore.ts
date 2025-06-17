import { create } from "zustand";

interface ModalStore {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  clickedValue: string;
  setClickedValue: (value: string | undefined) => void;
  categoryId?: number | null;
  setCategoryId?: (value: number | null) => void;
  image: string | null;
  setImage: (value: string | null) => void;
  description: string | null;
  setDescription: (value: string | null) => void;
  name: string | null;
  setName: (value: string | null) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isClicked: false,
  setIsClicked: (value) => set({ isClicked: value }),
  clickedValue: "카테고리 선택",
  setClickedValue: (value) => set({ clickedValue: value }),
  categoryId: null,
  setCategoryId: (value) => set({ categoryId: value }),
  image: null,
  setImage: (value) => set({ image: value }),
  description: null,
  setDescription: (value) => set({ description: value }),
  name: null,
  setName: (value) => set({ name: value }),
}));

export default useModalStore;
