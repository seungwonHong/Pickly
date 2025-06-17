"use client";
<<<<<<< HEAD
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "cookies-next";

=======
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { checkLoginStatus } from "../../hooks/checkLogin";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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

<<<<<<< HEAD
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
=======
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { accessToken } = await checkLoginStatus();
        if (!accessToken) {
          console.warn("accessToken이 없습니다.");
        }
        const res = await productService.getProductsId(
          productId,
          accessToken ?? ""
        );
        setIsLiked(res.data.isFavorite);
        setFavoriteCount(res.data.favoriteCount);
      } catch (error) {
        console.error("상품 상세 정보 에러:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleLike = async () => {
    const { isLoggedIn, accessToken } = await checkLoginStatus();
    //  console.log("isLoggedIn", isLoggedIn);
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (!isLiked) {
        await productService.postProductsFavorite(productId, accessToken ?? "");
        setFavoriteCount(favoriteCount + 1);
      } else {
        await productService.deleteProductsFavorite(
          productId,
          accessToken ?? ""
        );
        setFavoriteCount(favoriteCount - 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      const err = error as Error;
      console.error("Axios 에러 응답:", err.message);
      if (err.message) {
        console.error("Axios 에러 응답:", err.message);
      }
    }
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
