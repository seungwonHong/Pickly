"use client";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import React from "react";
=======
import ProductComparePlusModal from "./ProductComparePlusModal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
import { FaPlus } from "react-icons/fa6";

const FloatingButton = () => {
  const router = useRouter();
<<<<<<< HEAD

  const handleModalOpen = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "true");
    router.push(`?${params.toString()}`, { scroll: false });
=======
  const [isLogin, setIsLogin] = useState(false);

  const handleModalOpen = async () => {
    try {
      const csrfToken =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("csrf-token="))
          ?.split("=")[1] ?? "";

      const res = await fetch("/api/cookie", {
        method: "GET",
        credentials: "include",
        headers: {
          "x-csrf-token": csrfToken,
        },
      });

      const data = await res.json();

      if (!data.success) {
        // 로그인이 안 되었다는 모달 띄우기 위한 상태 변경
        setIsLogin(true);
      } else {
        const params = new URLSearchParams(window.location.search);
        params.set("modal", "true");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    } catch (error) {
      console.error("상품 추가를 위한 로그인 인증 중 실패", error);
    }
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  };

  return (
    <div
      className="transition-transform duration-300 hover:scale-110 flex flex-row items-center justify-center w-[60px] h-[60px] rounded-full cursor-pointer"
      style={{ background: "var(--gradient-main_gradiation)" }}
      onClick={handleModalOpen}
    >
      <FaPlus color="#F1F1F5" size={22} />

      {isLogin && (
        <ProductComparePlusModal
          open={isLogin}
          setOpen={setIsLogin}
          message="로그인이 필요합니다."
          buttonText="로그인"
          onButtonClick={() => {
            router.push("/signin");
          }}
        />
      )}
    </div>
  );
};

export default FloatingButton;
