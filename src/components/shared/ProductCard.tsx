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
      <div className="relative transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center p-[10px] min-w-[160px] min-h-[183px] max-w-[300px] w-full h-full rounded-xl bg-[#252530] border-[1px] border-[#353542] aspect-square overflow-hidden">
        <div
          className="w-[90%] h-[90%] flex flex-col items-center justify-between"
          style={{ fontSize: "clamp(10px, 2vw, 18px)" }}
        >
          <img
            src={product.image}
            alt="productImage"
            className="w-[80%] md:h-[70%] h-[60%] mb-2 object-contain"
          />
          <CategoryChip
            category={indexCategoryMap[product.categoryId]}
            className="absolute lg:top-[15px] lg:left-[15px] md:top-[10px] md:left-[10px] top-[5px] left-[5px]"
          />

          <div className="flex flex-col w-full lg:px-[6px]">
            <span className="lg:text-[18px] md:text-[16px] text-[14px] text-[#F1F1F5] font-medium w-full truncate">
              {product.name}
            </span>

            <div className="flex lg:flex-row md:flex-row flex-col md:items-center items-start md:justify-between mt-[5px] lg:text-[16px] md:text-[14px] text-[12px] font-light">
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
      </div>
    </Link>
  );
};

export default ProductCard;
