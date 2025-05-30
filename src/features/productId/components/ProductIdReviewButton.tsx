"use client";
import { useState } from "react";
import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import useGetUser from "../hooks/useGetUser";
import ProductReviewModal from "./modal/ProductReviewModal";

export default function ProductIdReviewButton({
  productUserId,
}: {
  productUserId: number;
}) {
  // useGetUser 훅을 사용하여 사용자 정보를 가져옴
  const { user } = useGetUser();
  const isOwner = user?.id === productUserId;

  // 모달
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const handleReviewClick = () => {
    if (!user) {
      // 로그인하지 않은 경우 모달을 열도록 설정
      setOpenReviewModal(false);
    }
    // 로그인한 경우 리뷰 작성 로직을 여기에 추가
    setOpenReviewModal(true);
  };
  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between">
          리뷰작성하기 클릭시 로그인 여부에 따라 모달
          <BaseButton
            disabled={false}
            className="px-[123.5px] py-[22px] font-semibold text-[18px] "
            onClick={handleReviewClick}
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
      ) : (
        <div className="flex items-center justify-between">
          <BaseButton
            disabled={false}
            className="px-[43.5px] py-[22px] font-semibold text-[18px] "
            onClick={handleReviewClick}
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
      )}
      {openReviewModal && (
        <ProductReviewModal
          open={openReviewModal}
          setOpen={setOpenReviewModal}
          productUserId={productUserId}
        />
      )}
    </>
  );
}
