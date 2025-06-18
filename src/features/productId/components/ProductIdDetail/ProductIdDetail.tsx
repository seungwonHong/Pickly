import CopyLinkImage from "./CopyLinkImage";
import CategoryChip from "@/components/CategoryChip";
import { productService } from "../../api";
import ProductIdDetailHeart from "./ProductIdDetailHeart";
import ProductIdReviewButton from "./ProductIdDetailButton";
import Image from "next/image";

export default async function ProductIdDetailClient({
  productId,
}: {
  productId: number;
}) {
  const response = await productService.getProductsId(productId);
  const product = response.data;

  return (
    <div className="flex md:items-start items-center justify-between lg:gap-[60px] md:gap-[40px] text-[#f1f1f5] md:flex-row flex-col gap-[20px]">
      <div className="lg:w-[306px] lg:h-[306px] md:w-[242px] md:h-[242px] w-[220px] h-[220px] flex justify-center items-center overflow-hidden bg-[#1C1C22]">
        <Image
          src={product.image}
          alt="상품 이미지"
          width={306}
          height={306}
          loading="eager"
          unoptimized
          className="w-full h-full object-cover"
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
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <div className="lg:text-2xl text-[20px] font-semibold">
                {product.name}
              </div>
              <ProductIdDetailHeart
                productId={productId}
                initialIsFavorite={product.isFavorite}
              />
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
