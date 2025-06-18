"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useProductStatsStore } from "../../libs/useProductStatsStore";

import { GetProductIdDetail } from "../../types";
import Heart from "../../../../../public/icons/Heart.png";
import Star from "../../../../../public/icons/star.svg";
import Talk from "../../../../../public/icons/Talk.png";
const ProductIdStatsBone = dynamic(() => import("./ProductIdStatsBone"));
export default function ProductStatsClient({
  product,
}: {
  product: GetProductIdDetail;
}) {
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

  const isLoading =
    rating === undefined ||
    reviewCount === undefined ||
    favoriteCount === undefined;
  return (
    <div className="md:h-[244px] h-full min-h-[200px] text-amber-50 flex items-start flex-col gap-[29px]">
      <div className="lg:text-[20px] md:text-[16px] font-normal">상품통계</div>

      {isLoading ? (
        <div className="flex justify-between align-center md:flex-row flex-col gap-[15px] w-full">
          <div className="w-full h-[80px] bg-gray-700 rounded-md animate-pulse" />
          <div className="w-full h-[80px] bg-gray-700 rounded-md animate-pulse" />
          <div className="w-full h-[80px] bg-gray-700 rounded-md animate-pulse" />
        </div>
      ) : (
        <div className="flex justify-between align-center md:flex-row flex-col gap-[15px] w-full">
          <ProductIdStatsBone
            title="별점 평균"
            icon={Star}
            score={Number(rating.toFixed(1))}
            diffValue={Number(
              (rating - product.categoryMetric.rating).toFixed(1)
            )}
            unit=" 점"
          />
          <ProductIdStatsBone
            title="하트 수"
            icon={Heart}
            score={Number(favoriteCount.toFixed(1))}
            diffValue={Number(
              (favoriteCount - product.categoryMetric.favoriteCount).toFixed(1)
            )}
            unit=" 개"
          />
          <ProductIdStatsBone
            title="댓글 수"
            icon={Talk}
            score={Number(reviewCount.toFixed(1))}
            diffValue={Number(
              (reviewCount - product.categoryMetric.reviewCount).toFixed(1)
            )}
            unit=" 개"
          />
        </div>
      )}
    </div>
  );
}
