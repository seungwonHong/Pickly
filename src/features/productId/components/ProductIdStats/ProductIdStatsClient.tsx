"use client";
import { useEffect } from "react";

import { useProductStatsStore } from "../../libs/useProductStatsStore";
import ProductIdStatsBone from "./ProductIdStatsBone";

import Heart from "../../../../../public/icons/Heart.png";
import Star from "../../../../../public/icons/star.svg";
import Talk from "../../../../../public/icons/Talk.png";

export default function ProductStatsClient({ product }: { product: any }) {
  const {
    setRating,
    setReviewCount,
    setFavoriteCount,
    setIsFavorite,
    rating,
    reviewCount,
    favoriteCount,
  } = useProductStatsStore();

  useEffect(() => {
    setRating(product.rating);
    setReviewCount(product.reviewCount);
    setFavoriteCount(product.favoriteCount);
    setIsFavorite?.(product.isFavorite);
  }, [product]);

  return (
    <div className="w-[940px] h-[244px] text-amber-50 flex flex-col gap-[29px]">
      <div className="text-[20px] font-normal">상품통계</div>
      <div className="flex justify-between align-center">
        <ProductIdStatsBone
          title="별점 평균"
          icon={Star}
          score={rating.toFixed(1)}
          diffValue={Number(
            (rating - product.categoryMetric.rating).toFixed(1)
          )}
          unit=" 점"
        />
        <ProductIdStatsBone
          title="하트 수"
          icon={Heart}
          score={favoriteCount}
          diffValue={favoriteCount - product.categoryMetric.favoriteCount}
          unit=" 개"
        />
        <ProductIdStatsBone
          title="댓글 수"
          icon={Talk}
          score={reviewCount}
          diffValue={reviewCount - product.categoryMetric.reviewCount}
          unit=" 개"
        />
      </div>
    </div>
  );
}
