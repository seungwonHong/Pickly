import { create } from "zustand";

interface ModalStore {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  clickedValue: string;
  setClickedValue: (value: string | undefined) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isClicked: false,
  setIsClicked: (value) => set({ isClicked: value }),
  clickedValue: '카테고리 선택',
  setClickedValue: (value) => set({ clickedValue: value }),
}));

export default useModalStore;
