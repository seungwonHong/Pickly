"use client";
import { useEffect, useState } from "react";
import CompareProductInput from "../components/CompareProductInput";
import CompareProductInputSecond from "./CompareProductInputSecond";
import BaseButton from "../../../components/shared/BaseButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductComparisonResult from "./ProductComparisonResult";
import ComparisonResult from "./ComparisonResult";
import useGetUser from "@/features/productId/hooks/useGetUser";
import { useProductStatsStore } from "@/features/productId/libs/useProductStatsStore";

type ProductStats = {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
};

export default function CompareProductForm() {
  const [product1, setProduct1] = useState<number | null>(null);
  const [product2, setProduct2] = useState<number | null>(null);
  const [category1, setCategory1] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [product2Stats, setProduct2Stats] = useState<ProductStats | null>(null);
  const [product1Name, setProduct1Name] = useState("");
  const [product2Name, setProduct2Name] = useState("");

  const isBothSelected = product1 !== null && product2 !== null;

  const { baseCompareProductId } = useGetUser();
  const { rating, reviewCount, favoriteCount } = useProductStatsStore();
  const product1Stats: ProductStats = { rating, reviewCount, favoriteCount };

  useEffect(() => {
    if (!isBothSelected && showResult) {
      setShowResult(false);
    }
  }, [product1, product2, showResult]);

  const getWinnerName = () => {
    if (!product2Stats) return null;

    let product1Win = 0;
    let product2Win = 0;

    const metrics: (keyof ProductStats)[] = [
      "rating",
      "reviewCount",
      "favoriteCount",
    ];

    for (const metric of metrics) {
      const val1 = product1Stats[metric];
      const val2 = product2Stats[metric];
      if (val1 > val2) product1Win++;
      else if (val2 > val1) product2Win++;
    }

    if (product1Win > product2Win)
      return { name: product1Name, count: product1Win };
    if (product2Win > product1Win)
      return { name: product2Name, count: product2Win };
    return { name: "무승부", count: 0 };
  };

  const winnerInfo = getWinnerName();

  return (
    <>
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault(); // 엔터 키로 폼 제출 방지
        }}
      >
        <div className="flex flex-col md:flex-row flex-wrap gap-[40px] lg:gap-[5px] justify-center items-start w-full mt-10 px-2">
          <CompareProductInput
            label="상품 1"
            tagColor="green"
            onProductSelectId={setProduct1}
            onCategorySelect={setCategory1}
            excludeId={product2}
            defaultProductId={baseCompareProductId}
            setShowResult={setShowResult}
            onProductNameChange={setProduct1Name}
          />

          <CompareProductInputSecond
            label="상품 2"
            tagColor="pink"
            onProductSelectId={setProduct2}
            onProductStatsChange={setProduct2Stats}
            excludeId={product1}
            categoryFilter={category1}
            setShowResult={setShowResult}
            onProductNameChange={setProduct2Name}
          />

          <div
            className="w-full max-w-full lg:max-w-[200px] px-2 mt-8"
            onClick={() => {
              if (!isBothSelected) {
                toast.warn("비교할 제품을 선택해 주세요");
              }
              setShowResult(true);
            }}
          >
            <BaseButton
              disabled={!isBothSelected}
              className={`w-full h-[70px] text-[16px] lg:text-[18px]${
                isBothSelected
                  ? ""
                  : "pointer-events-none cursor-not-allowed text-[#6E6E82]"
              }`}
            >
              비교하기
            </BaseButton>
          </div>
        </div>
      </form>

      {showResult && winnerInfo && (
        <div className="mt-15">
          <ProductComparisonResult
            winnerInfo={winnerInfo}
            product1Name={product1Name}
          />
        </div>
      )}

      {showResult && product2Stats && (
        <div className="mt-10">
          <ComparisonResult
            product1Stats={product1Stats}
            product2Stats={product2Stats}
          />
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}
