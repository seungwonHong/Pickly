import React from "react";

type Props = {
  winnerInfo: { name: string; count: number } | null;
  product1Name: string;
};

const ProductComparisonResult = ({ winnerInfo, product1Name }: Props) => {
  if (!winnerInfo) return null;

  const isDraw = winnerInfo.name === "무승부";

  const winnerTextColor = isDraw
    ? "text-[var(--color-lightGray)]"
    : winnerInfo.name === product1Name
    ? "text-[var(--color-green)]"
    : "text-[var(--color-pink)]";


  return (
    <div className="text-center">
      <h1 className="text-[24px] font-normal text-white">
        {isDraw ? (
          <>무승부입니다!</>
        ) : (
          <>
            <span className={winnerTextColor}>{winnerInfo.name}</span> 상품이 승리하였습니다!
          </>
        )}
      </h1>
      {!isDraw && (
        <p className="mt-3 text-[var(--color-lightGray)] text-[16px] font-normal mb-1">
          3가지 항목 중{" "}
          <span className="font-normal">{winnerInfo.count}가지 항목</span>에서 우세합니다.
        </p>
      )}
    </div>
  );
};

export default ProductComparisonResult;