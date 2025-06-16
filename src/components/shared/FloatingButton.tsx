"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const FloatingButton = () => {
  const router = useRouter();

  const handleModalOpen = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "true");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="transition-transform duration-300 hover:scale-110 flex flex-row items-center justify-center w-[60px] h-[60px] rounded-full cursor-pointer"
      style={{ background: "var(--gradient-main_gradiation)" }}
      onClick={handleModalOpen}
    >
      <FaPlus color="#F1F1F5" size={22} />
    </div>
  );
};

export default FloatingButton;
