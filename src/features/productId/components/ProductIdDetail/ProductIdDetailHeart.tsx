"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { productService } from "../../api";
import { useProductStatsStore } from "../../libs/useProductStatsStore";
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

  const handleLike = async () => {
    if (!isLiked) {
      await productService.postProductsFavorite(productId);
      setFavoriteCount(favoriteCount + 1);
    } else {
      await productService.deleteProductsFavorite(productId);
      setFavoriteCount(favoriteCount - 1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      const response = await productService.getProductsId(productId);
      setIsLiked(response.data.isFavorite);
    };
    checkLikeStatus();
  }, [productId]);

  return (
    <div onClick={handleLike}>
      <Image
        src={isLiked ? HeartActive : HeartInactive}
        alt="좋아요"
        width={28}
        height={28}
        className="cursor-pointer hover:scale-110 transition-transform duration-200"
      />
    </div>
  );
}
