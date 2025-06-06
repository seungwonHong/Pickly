"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import { GetProductIdDetail } from "../../types";
import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import useGetUser from "../../hooks/useGetUser";

import ProductReviewModal from "../modal/ProductReviewModal/ProductReviewModal";
import ProductCompareModal from "../modal/ProductCompareModal/ProductCompareModal";
import ProductComparePlusModal from "../modal/ProductCompareModal/ProductComparePlusModal";

export default function ProductIdDetailButton({
  product,
}: {
  product: GetProductIdDetail;
}) {
  // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
  const { user, compareList, addToCompare } = useGetUser();
  const isOwner = user?.id === product.writerId;

  const searchParams = useSearchParams();
  const router = useRouter();
  const sameCategoryCompareList = compareList.filter(
    (item) => item.category.id === product?.category?.id
  );
  // 비교 교체 모달 상태
  const [isCompareModalOpen, setCompareModalOpen] = useState(false);

  // 공통 모달
  const [isComparePlusModalOpen, setComparePlusModalOpen] = useState("");
  const [isPlusButtonMessage, setPlusButtonMessage] = useState("");
  const [modalBaseOpen, setModalBaseOpen] = useState(false);

  // 리뷰 모달
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
  // 로그인 리다이렉트 핸들러
  const handleLoginRedirect = () => {
    setModalBaseOpen(false);
    router.push("/signin");
  };
  // 비교하기 리다이렉트 핸들러
  const handleCompareRedirect = () => {
    setModalBaseOpen(false);
    router.push("/compare");
  };
  // 비교하기 모달
  const handleCompareClick = () => {
    if (!product || !sameCategoryCompareList) return;

    if (user === null) {
      setComparePlusModalOpen("로그인이 필요합니다.");
      setPlusButtonMessage("로그인하러가기");
      setModalBaseOpen(true);
      return;
    }

    const isAlreadyInList = sameCategoryCompareList.some(
      (item) => Number(item.id) === Number(product.id)
    );

    if (isAlreadyInList) {
      setComparePlusModalOpen("이미 비교 목록에 있는 상품입니다.");
      setModalBaseOpen(true);
      return;
    }

    if (sameCategoryCompareList.length === 0) {
      addToCompare(product);
      setComparePlusModalOpen("비교 상품으로 등록되었습니다!");
      setModalBaseOpen(true);
    } else if (sameCategoryCompareList.length === 1) {
      addToCompare(product);
      setComparePlusModalOpen(
        "비교 상품으로 등록되었습니다.\n바로 확인해 보시겠어요?"
      );
      setPlusButtonMessage("확인하러가기");
      setModalBaseOpen(true);
    } else {
      setCompareModalOpen(true);
    }
  };

  // 쿠키 이용하면 로딩중 버튼 갯수 빠르게 로딩 가능
  return (
    <>
      {isOwner ? (
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
            onClick={handleCompareClick}
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
            onClick={openReviewModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[58.5px] py-[22px] font-semibold text-[18px]"
            onClick={handleCompareClick}
          >
            비교하기
          </TypeButton>
        </div>
      )}
      {isReviewModalOpen && (
        <ProductReviewModal
          open={isReviewModalOpen}
          setOpen={closeReviewModal}
        />
      )}
      {isCompareModalOpen && (
        <ProductCompareModal
          open={isCompareModalOpen}
          setOpen={setCompareModalOpen}
        />
      )}
      {isComparePlusModalOpen && (
        <ProductComparePlusModal
          open={modalBaseOpen}
          setOpen={setModalBaseOpen}
          message={isComparePlusModalOpen}
          buttonText={isPlusButtonMessage}
          onButtonClick={
            isPlusButtonMessage === "로그인하러가기"
              ? handleLoginRedirect
              : isPlusButtonMessage === "확인하러가기"
              ? handleCompareRedirect
              : undefined
          }
        />
      )}
    </>
  );
}
