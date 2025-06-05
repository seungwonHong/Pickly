import Image from "next/image";

import { productService } from "../../api";
import ProductIdReviewButton from "./ProductIdDetailButton";
import CategoryChip from "@/components/CategoryChip";
import ProductIdDetailHeart from "./ProductIdDetailHeart";

import KakaoLink from "../../../../../public/images/kakao-link.png";
import LinkShare from "../../../../../public/images/link-share.png";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductIdDetail({ params }: PageProps) {
  const productId = Number(params.id);
  const response = await productService.getProductsId(productId);
  const product = response.data;
  if (!product) return <div>상품 정보가 없습니다.</div>;
  console.log("productIdDetail:", product);
  return (
    <div className="flex items-start justify-between gap-10 text-[#f1f1f5]">
      <img src={product.image} width={306} height={228} alt="상품 이미지" />

      <div className="w-[545px] ">
        <CategoryChip
          category={product.category.name}
          className="text-[12px] mb-[9.5px]"
        />
        <div className="flex items-center justify-between pb-[49px]">
          <div className="flex items-center gap-[15px] justify-between">
            <div className="text-2xl font-semibold">{product.name}</div>
            {/* 찜 하트는 csr이라 따로 컴포넌트 팜 */}
            <ProductIdDetailHeart productId={productId} />
          </div>
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
        <div className="text-[16px] pb-[60px] font-normal">
          {product.description}
        </div>
        {/* 여기는 csr로 해야함 -> 로그인 여부에 따라 모양이 달라짐 */}
        <ProductIdReviewButton productUserId={product.writerId} />
      </div>
    </div>
  );
}
