"use client";

<<<<<<< HEAD
import { productService } from "../../api";
import ProductIdReviewButton from "./ProductIdDetailButton";
import CategoryChip from "@/components/CategoryChip";
import ProductIdDetailHeart from "./ProductIdDetailHeart";

import KakaoLink from "../../../../../public/images/kakao-link.png";
import LinkShare from "../../../../../public/images/link-share.png";

export default async function ProductIdDetail({
=======
import dynamic from "next/dynamic";
import CopyLinkImage from "./CopyLinkImage";
import CategoryChip from "@/components/CategoryChip";
import ProductImage from "../ProductImage";
import { useGetProductIdGet } from "../../hooks/useGetProductId";
const ProductIdDetailHeart = dynamic(() => import("./ProductIdDetailHeart"), {
  ssr: false,
});
const ProductIdReviewButton = dynamic(() => import("./ProductIdDetailButton"), {
  ssr: false,
});

export default function ProductIdDetailClient({
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  productId,
}: {
  productId: number;
}) {
<<<<<<< HEAD
  const response = await productService.getProductsId(productId);
  const product = response.data;
  if (!product) return <div>상품 정보가 없습니다.</div>;
  return (
    <div className="flex md:items-start items-center justify-between lg:gap-[60px] md:gap-[40px] text-[#f1f1f5] md:flex-row flex-col gap-[20px]">
      <div className="lg:w-[306px] lg:h-[306px] md:w-[242px] md:h-[242px]  w-[220px] h-[220px] flex justify-center items-center overflow-hidden bg-[#1C1C22">
        <img
          src={product.image}
          alt="상품 이미지"
          className="lg:max-w-[306px] lg:max-h-[306px] md:w-[242px] md:h-[242px] w-auto h-auto object-contain"
=======
  const { product, isLoading, isError } = useGetProductIdGet(productId);
  if (isLoading) return <div>상품 정보를 불러오는 중입니다...</div>;
  if (isError || !product) return <div>상품 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="flex md:items-start items-center justify-between lg:gap-[60px] md:gap-[40px] text-[#f1f1f5] md:flex-row flex-col gap-[20px]">
      <div className="lg:w-[306px] lg:h-[306px] md:w-[242px] md:h-[242px]  w-[220px] h-[220px] flex justify-center items-center overflow-hidden bg-[#1C1C22">
        <ProductImage
          src={product.image}
          alt="상품 이미지"
          width={306}
          height={306}
          className="w-full h-full object-cover"
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        />
      </div>

      <div className="lg:w-[545px] md:w-[384px]">
        <div className="flex items-center justify-between mb-[9.5px]">
          <CategoryChip
            category={product.category.name}
<<<<<<< HEAD
            className="text-[12px] "
          />
          <div className="flex items-center justify-between gap-[10px] ">
            <Image
              src={KakaoLink}
              alt="카카오 공유 링크"
              width={28}
              height={28}
            />
            <Image src={LinkShare} alt="링크 공유" width={28} height={28} />
          </div>
        </div>
=======
            className="text-[12px]"
          />
          <CopyLinkImage />
        </div>

>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-between w-full">
              <div className="lg:text-2xl text-[20px] font-semibold">
                {product.name}
              </div>
<<<<<<< HEAD
              {/* 찜 하트는 csr이라 따로 컴포넌트 팜 */}
=======
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
              <ProductIdDetailHeart productId={productId} />
            </div>
          </div>
          <div className="lg:text-[16px] md:text-[14px] font-normal">
            {product.description}
          </div>
<<<<<<< HEAD
          {/* 여기는 csr로 해야함 -> 로그인 여부에 따라 모양이 달라짐 */}
=======
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
          <ProductIdReviewButton product={product} />
        </div>
      </div>
    </div>
  );
}
