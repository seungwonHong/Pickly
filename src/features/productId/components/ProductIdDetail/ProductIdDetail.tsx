import { productService } from "../../api";
import CopyLinkImage from "./CopyLinkImage";
import ProductIdReviewButton from "./ProductIdDetailButton";
import CategoryChip from "@/components/CategoryChip";
import ProductIdDetailHeart from "./ProductIdDetailHeart";

export default async function ProductIdDetail({
  productId,
}: {
  productId: number;
}) {
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
        />
      </div>

      <div className="lg:w-[545px] md:w-[384px]">
        <div className="flex items-center justify-between mb-[9.5px]">
          <CategoryChip
            category={product.category.name}
            className="text-[12px] "
          />
          <CopyLinkImage />
        </div>
        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-between w-full">
              <div className="lg:text-2xl text-[20px] font-semibold">
                {product.name}
              </div>
              {/* 찜 하트는 csr이라 따로 컴포넌트 팜 */}
              <ProductIdDetailHeart productId={productId} />
            </div>
          </div>
          <div className="lg:text-[16px] md:text-[14px] font-normal">
            {product.description}
          </div>
          {/* 여기는 csr로 해야함 -> 로그인 여부에 따라 모양이 달라짐 */}
          <ProductIdReviewButton product={product} />
        </div>
      </div>
    </div>
  );
}
