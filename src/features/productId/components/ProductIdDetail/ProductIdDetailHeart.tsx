"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useProductStatsStore } from "../../libs/useProductStatsStore";
import { checkLoginStatus } from "../../hooks/checkLogin";
import { productService } from "../../api";
import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";

import HeartInactive from "../../../../../public/icons/heart-inactive.svg";
import HeartActive from "../../../../../public/icons/heart-active.svg";

export default function ProductIdDetailHeart({
  productId,
  initialIsFavorite,
}: {
  productId: number;
  initialIsFavorite: boolean;
}) {
  const [isLiked, setIsLiked] = useState(initialIsFavorite);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();

  const { favoriteCount, setFavoriteCount } = useProductStatsStore();

  const handleLike = async () => {
    const { isLoggedIn, accessToken } = await checkLoginStatus();
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (!isLiked) {
        const res = await productService.postProductsFavorite(
          productId,
          accessToken ?? ""
        );

        setFavoriteCount(favoriteCount + 1);
        setIsLiked(res.data.isFavorite);
      } else {
        const res = await productService.deleteProductsFavorite(
          productId,
          accessToken ?? ""
        );
        setFavoriteCount(Math.max(favoriteCount - 1, 0));
        setIsLiked(res.data.isFavorite);
      }
    } catch (error) {
      console.error("좋아요 에러:", error);
    }
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const { isLoggedIn, accessToken } = await checkLoginStatus();
      if (isLoggedIn) {
        try {
          const res = await productService.getProductsId(
            productId,
            accessToken ?? ""
          );
          setIsLiked(res.data.isFavorite);
        } catch (err) {
          console.error("찜 상태 불러오기 실패:", err);
        }
      }
    };

    fetchFavoriteStatus();
  }, [productId]);

  return (
    <>
      <div
        onClick={handleLike}
        className="flex items-center gap-1 cursor-pointer"
      >
        <Image
          src={isLiked ? HeartActive : HeartInactive}
          alt="좋아요"
          width={28}
          height={28}
          priority
          className="hover:scale-110 transition-transform duration-200"
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
