import { ProductList } from "@/features/home/types/productType";
import Link from "next/link";
import React from "react";
import CategoryChip from "../CategoryChip";

interface Props {
  product: ProductList;
}

const ProductCard = ({ product }: Props) => {
  const indexCategoryMap: Record<number, string> = {
    0: "검색",
    1: "음악",
    2: "영화/드라마",
    3: "강의/책",
    4: "호텔",
    5: "가구/인테리어",
    6: "식당",
    7: "전자기기",
    8: "화장품",
    9: "의류/악세서리",
    10: "앱",
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="relative transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center p-[10px] lg:w-[300px] lg:h-[308px] md:w-[247px] md:h-[256px] w-[160px] h-[183px] rounded-xl bg-[#252530] border-[1px] border-[#353542]">
        <img
          src={product.image}
          alt="productImage"
          className="object-contain w-auto lg:max-h-[200px] md:max-h-[160px] max-h-[98px]"
        />
        <CategoryChip
          category={indexCategoryMap[product.categoryId]}
          className="absolute lg:top-[15px] lg:left-[15px] md:top-[10px] md:left-[10px] top-[5px] left-[5px]"
        />

        <div className="flex flex-col lg:mt-[20px] md:mt-[20px] mt-[10px] w-full lg:px-[6px]">
          <span className="lg:text-[18px] md:text-[16px] text-[14px] text-[#F1F1F5] font-medium">
            {product.name}
          </span>

          <div className="flex lg:flex-row md:flex-row flex-col md:items-center items-start md:justify-between lg:mt-[10px] md:mt-[10px] mt-[5px] lg:text-[16px] md:text-[14px] text-[12px] font-light">
            <div className="flex flex-row items-center text-[#6E6E82] ">
              <span>리뷰 {product.reviewCount}</span>
              <span className="md:ml-[15px] ml-[10px]">
                찜 {product.favoriteCount}
              </span>
            </div>

            <span className="text-[#9FA6B2]">
              ⭐️ {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
