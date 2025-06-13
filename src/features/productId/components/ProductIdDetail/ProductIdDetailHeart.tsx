"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { checkLoginStatus } from "../../hooks/checkLogin";
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
    } catch (error: any) {
      console.error("Axios 에러 응답:", error.response.data);
      if (error.isAxiosError) {
        console.error("Axios 에러 응답:", error.response.data);
        console.error("Axios 에러 요청 설정:", error.config);
      }
    }
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
