import React from "react";

import { productService } from "../../api";
import ProductIdStatsBone from "./ProductIdStatsBone";

import Heart from "../../../../../public/icons/heart-active.svg";
import Star from "../../../../../public/icons/star.svg";
import Talk from "../../../../../public/icons/Talk.png";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function generateStaticParams({ params }: PageProps) {
  const { data: product } = await productService.getProductsId(
    Number(params.id)
  );
  return (
    <div className="w-[940px] h-[244px] text-amber-50 flex flex-col gap-[29px]">
      <div className="text-[20px] font-normal">상품통계</div>
      <div className="flex justify-between align-center ">
        <ProductIdStatsBone
          title="별점 평균"
          icon={Star}
          score={product?.rating?.toFixed(1)}
          diffValue={Number(
            (product?.rating - product?.categoryMetric?.rating).toFixed(1)
          )}
          unit=" 점"
        />
        <ProductIdStatsBone
          title="하트 수"
          icon={Heart}
          score={product?.favoriteCount}
          diffValue={
            product?.favoriteCount - product?.categoryMetric?.favoriteCount
          }
          unit=" 개"
        />
        <ProductIdStatsBone
          title="댓글 수"
          icon={Talk}
          score={product?.reviewCount}
          diffValue={
            product?.reviewCount - product?.categoryMetric?.reviewCount
          }
          unit=" 개"
        />
      </div>
    </div>
  );
}
