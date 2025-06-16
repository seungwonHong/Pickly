"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "cookies-next";

import { productService } from "../../api";
import { useProductStatsStore } from "../../libs/useProductStatsStore";
import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";

import HeartInactive from "../../../../../public/icons/heart-inactive.svg";
import HeartActive from "../../../../../public/icons/heart-active.svg";

// 찜 하트 활성화 / 비활성화
export default function ProductIdDetailHeart({
  productId,
}: {
  productId: number;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const { favoriteCount, setFavoriteCount } = useProductStatsStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    const csrfToken = (await getCookie("csrf-token")) ?? "";

    const res = await fetch("/api/cookie", {
      method: "GET",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });
    if (!res.ok) {
      setShowLoginModal(true); // 로그인되어 있지 않으면 모달 표시
      return;
    }

    if (!isLiked) {
      await productService.postProductsFavorite(productId);
      setFavoriteCount(favoriteCount + 1);
    } else {
      await productService.deleteProductsFavorite(productId);
      setFavoriteCount(favoriteCount - 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div onClick={handleLike}>
        <Image
          src={isLiked ? HeartActive : HeartInactive}
          alt="좋아요"
          width={28}
          height={28}
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
        />
      </div>
      <ProductComparePlusModal
        open={showLoginModal}
        setOpen={setShowLoginModal}
        message={"로그인이 필요한 서비스입니다."}
        buttonText="로그인하러가기"
        onButtonClick={() => {
          setShowLoginModal(false);
          router.push("/signin");
        }}
      />
    </>
  );
}
