"use client";
import { useSearchParams, useRouter } from "next/navigation";

import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import ProductCompareChangeModal from "@/features/productId/components/modal/ProductCompareModal/ProductCompareChangeModal";

export default function ProductIdDetailButton() {
  // 모달 열기 및 닫기 로직 (이렇게 할 수 있다니...ㄷㄷ...)
  const searchParams = useSearchParams();
  const router = useRouter();

  // 비교하기 상품이 교체되었어요 모달
  const isReviewModalOpen = searchParams.get("modal") === "compareChange";
  const openReviewModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "compareChange");
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const closeReviewModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 비교하기 모달
  // const isCompareModalOpen = searchParams.get("modal") === "compare";
  // const openCompareModal = () => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("modal", "compare");
  //   router.replace(`?${params.toString()}`, { scroll: false });
  // };
  // const closeCompareModal = () => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.delete("modal");
  //   router.replace(`?${params.toString()}`, { scroll: false });
  // };

  // 쿠키 이용하면 로딩중 버튼 갯수 빠르게 로딩 가능ㄴㄴ
  return (
    <>
      <div className="flex items-center justify-between">
        <BaseButton
          disabled={false}
          className="px-[123.5px] py-[22px] font-semibold text-[18px] "
          onClick={openReviewModal}
        >
          비교상품이교체되었어요 모달
        </BaseButton>
        <TypeButton
          type="secondary"
          className="px-[58.5px] py-[22px] font-semibold text-[18px]"
          // onClick={openCompareModal}
        >
          비교하기
        </TypeButton>
      </div>
      {/* 리뷰 작성 모달 컴포넌트 */}
      {isReviewModalOpen && (
        <ProductCompareChangeModal
          open={isReviewModalOpen}
          setOpen={closeReviewModal}
        />
      )}
    </>
  );
}
