"use client";

import { useProductStatsStore } from "@/features/productId/libs/useProductStatsStore";

type ProductStats = {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
};

interface Props {
  product1Stats: ProductStats;
  product2Stats: ProductStats;
}

export default function ComparisonResult({ product2Stats }: Props) {
  const { rating, reviewCount, favoriteCount } = useProductStatsStore();

  const product1Stats: ProductStats = {
    rating,
    reviewCount,
    favoriteCount,
  };

  const getWinner = (val1: number, val2: number) => {
    const v1 = val1 ?? 0;
    const v2 = val2 ?? 0;
    if (v1 > v2) return "상품 1 승리";
    if (v1 < v2) return "상품 2 승리";
    return "무승부";
  };

  const getWinnerColor = (val1: number, val2: number) => {
    if (val1 > val2) return "text-[var(--color-green)]";
    if (val1 < val2) return "text-[var(--color-pink)]";
    return "text-[var(--color-lightGray)]";
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="rounded-lg overflow-hidden border-2 border-[#353542] shadow-md max-w-[700px] w-full bg-[#1E1E24]">
        {product2Stats && (
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-[#252530] text-[var(--color-lightGray)] font-light border-b border-[#353542]">
                <th className="p-4 font-light">기준</th>
                <th className="p-4 font-light">상품 1</th>
                <th className="p-4 font-light">상품 2</th>
                <th className="p-4 font-light">결과</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              <tr className="bg-[#252530]">
                <td className="p-4 text-[var(--color-lightGray)]">별점</td>
                <td className="p-4 text-white">
                  {product1Stats.rating.toFixed(1)}
                </td>
                <td className="p-4 text-white">
                  {product2Stats.rating.toFixed(1)}
                </td>
                <td
                  className={`p-4 font-bold ${getWinnerColor(
                    product1Stats.rating,
                    product2Stats.rating
                  )}`}
                >
                  {getWinner(product1Stats.rating, product2Stats.rating)}
                </td>
              </tr>
              <tr className="bg-[#252530]">
                <td className="p-4 text-[var(--color-lightGray)]">리뷰 개수</td>
                <td className="p-4 text-white">{product1Stats.reviewCount}</td>
                <td className="p-4 text-white">{product2Stats.reviewCount}</td>
                <td
                  className={`p-4 font-bold ${getWinnerColor(
                    product1Stats.reviewCount,
                    product2Stats.reviewCount
                  )}`}
                >
                  {getWinner(
                    product1Stats.reviewCount,
                    product2Stats.reviewCount
                  )}
                </td>
              </tr>
              <tr className="bg-[#252530]">
                <td className="p-4 text-[var(--color-lightGray)]">찜 개수</td>
                <td className="p-4 text-white">
                  {product1Stats.favoriteCount}
                </td>
                <td className="p-4 text-white">
                  {product2Stats.favoriteCount}
                </td>
                <td
                  className={`p-4 font-bold ${getWinnerColor(
                    product1Stats.favoriteCount,
                    product2Stats.favoriteCount
                  )}`}
                >
                  {getWinner(
                    product1Stats.favoriteCount,
                    product2Stats.favoriteCount
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
