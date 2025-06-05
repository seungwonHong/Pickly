"use client";
import { useSearchParams, useRouter } from "next/navigation";

import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";

import useGetUser from "../../hooks/useGetUser";

import ProductReviewModal from "../modal/ProductReviewModal/ProductReviewModal";

export default function ProductIdDetailButton({
  productUserId,
}: {
  productUserId: number;
}) {
  // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
  const { user } = useGetUser();
  console.log("current user:", user);
  const isOwner = user?.id === productUserId;
  console.log("productUserId:", productUserId);
  console.log("isOwner:", isOwner);
  const searchParams = useSearchParams();
  const router = useRouter();

  // 리뷰 모달
  const isReviewModalOpen = searchParams.get("modal") === "review";
  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "review");
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const closeModal = () => {
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
            className="px-[43.5px] py-[22px] font-semibold text-[18px] "
            onClick={openModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
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
      ) : (
        <div className="flex items-center justify-between">
          <BaseButton
            disabled={false}
            className="px-[123.5px] py-[22px] font-semibold text-[18px] "
            onClick={openModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[58.5px] py-[22px] font-semibold text-[18px]"
          >
            비교하기
          </TypeButton>
        </div>
      )}
      {isReviewModalOpen && (
        <ProductReviewModal open={isReviewModalOpen} setOpen={closeModal} />
      )}
    </>
  );
}
