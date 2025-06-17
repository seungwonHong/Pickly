"use client";

import dynamic from "next/dynamic";
import CopyLinkImage from "./CopyLinkImage";
import CategoryChip from "@/components/CategoryChip";

import { useGetProductIdGet } from "../../hooks/useGetProductId";

import defalutImage from "../../../../../public/defaultProfileImage.jpeg";
const ProductIdDetailHeart = dynamic(() => import("./ProductIdDetailHeart"), {
  ssr: false,
});
const ProductIdReviewButton = dynamic(() => import("./ProductIdDetailButton"), {
  ssr: false,
});

export default function ProductIdDetailClient({
  productId,
}: {
  productId: number;
}) {
  const { product, isLoading, isError } = useGetProductIdGet(productId);
  if (isLoading) return <div>상품 정보를 불러오는 중입니다...</div>;
  if (isError || !product) return <div>상품 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="flex md:items-start items-center justify-between lg:gap-[60px] md:gap-[40px] text-[#f1f1f5] md:flex-row flex-col gap-[20px]">
      <div className="lg:w-[306px] lg:h-[306px] md:w-[242px] md:h-[242px]  w-[220px] h-[220px] flex justify-center items-center overflow-hidden bg-[#1C1C22] relative">
        <img
          src={product.image || defalutImage}
          loading="eager"
          alt="상품 이미지"
          className="absolute inset-0 w-full h-full object-contain"
          width={306}
          height={306}
        />
      </div>

      <div className="lg:w-[545px] md:w-[384px]">
        <div className="flex items-center justify-between mb-[9.5px]">
          <CategoryChip
            category={product.category.name}
            className="text-[12px]"
          />
          <CopyLinkImage />
        </div>

        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-between w-full">
              <div className="lg:text-2xl text-[20px] font-semibold">
                {product.name}
              </div>
              <ProductIdDetailHeart productId={productId} />
            </div>
          </div>
          <div className="lg:text-[16px] md:text-[14px] font-normal">
            {product.description}
          </div>
          <ProductIdReviewButton product={product} />
        </div>
      </div>
    </div>
  );
}
