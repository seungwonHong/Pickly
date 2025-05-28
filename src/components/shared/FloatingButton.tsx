import React from "react";
import { FaPlus } from "react-icons/fa6";

type Props = {};

const FloatingButton = (props: Props) => {
  return (
    <div
      className="flex flex-row items-center justify-center w-[60px] h-[60px] rounded-full cursor-pointer"
      style={{ background: "var(--gradient-main_gradiation)" }}
    >
      <FaPlus color="#F1F1F5" size={22} />
    </div>
  );
};

export default FloatingButton;
