"use client";
import { useSearchParams, useRouter } from "next/navigation";

import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import ProductReviewModal from "../modal/ProductReviewModal/ProductReviewModal";
import ProductCompareModal from "../modal/ProductCompareModal/ProductCompareModal";

import { useUserStore } from "../../libs/userStore";

export default function ProductIdDetailButton({
  productUserId,
}: {
  productUserId: number;
}) {
  // useGetUser 훅을 사용하여 사용자 정보를 가져옴
  const { userId } = useUserStore();
  const isOwner = userId === productUserId;

  // 모달 열기 및 닫기 로직 (이렇게 할 수 있다니...ㄷㄷ...)
  const searchParams = useSearchParams();
  const router = useRouter();

  // 리뷰 작성 모달
  const isReviewModalOpen = searchParams.get("modal") === "review";
  const openReviewModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "review");
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const closeReviewModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 비교하기 모달
  const isCompareModalOpen = searchParams.get("modal") === "compare";
  const openCompareModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "compare");
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const closeCompareModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 쿠키 이용하면 로딩중 버튼 갯수 빠르게 로딩 가능
  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between">
          <BaseButton
            disabled={false}
            className="px-[123.5px] py-[22px] font-semibold text-[18px] "
            onClick={openReviewModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[58.5px] py-[22px] font-semibold text-[18px]"
            onClick={openCompareModal}
          >
            비교하기
          </TypeButton>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <BaseButton
            disabled={false}
            className="px-[43.5px] py-[22px] font-semibold text-[18px] "
            onClick={openReviewModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
            onClick={openCompareModal}
          >
            비교하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
          >
            편집하기
          </TypeButton>
        </div>
      )}
      {/* 리뷰 작성 모달 컴포넌트 */}
      {isReviewModalOpen && (
        <ProductReviewModal
          open={isReviewModalOpen}
          setOpen={closeReviewModal}
        />
      )}
      {/* 비교하기 모달 컴포넌트 */}
      {isCompareModalOpen && (
        <ProductCompareModal
          open={isCompareModalOpen}
          setOpen={closeCompareModal}
        />
      )}
    </>
  );
}
