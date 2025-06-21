"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import { checkLoginStatus } from "../../../hooks/checkLogin";
import BaseButton from "@/components/shared/BaseButton";

import { useProductStatsStore } from "@/features/productId/libs/useProductStatsStore";
import { GetProductIdReviews, GetProductIdReviewsDetail } from "../../../types";
import { useGetProductId } from "../../../hooks/useGetProductId";
import { reviewService } from "../../../api";

const ProductReviewInputModal = dynamic(
  () => import("./ProductReviewInputModal"),
  {
    ssr: false,
  }
);
const ReviewBaseModal = dynamic(() => import("./ReviewBaseModal"), {
  ssr: false,
});
const ProductIdGetModal = dynamic(() => import("./ProductIdGetModal"), {
  ssr: false,
});
const ProductReviewStarModal = dynamic(
  () => import("./ProductReviewStarModal"),
  {
    ssr: false,
  }
);
interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProductReviewModal({
  open,
  setOpen,
}: ProductReviewModalProps) {
  const setReviewCount = useProductStatsStore((state) => state.setReviewCount);
  const currentReviewCount = useProductStatsStore((state) => state.reviewCount);

  const setRating = useProductStatsStore((state) => state.setRating);
  const rating = useProductStatsStore((state) => state.rating);

  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState("");

  const [images, setImages] = useState<string[]>([]);
  // 상품 ID를 가져오기 위한 커스텀 훅 사용
  const { product } = useGetProductId();

  // 리뷰 post 요청을 위한 useMutation 훅
  const postReviewMutation = useMutation({
    mutationFn: ({ accessToken }: { accessToken: string }) =>
      reviewService.postReviews({
        productId: product.id,
        content: reviewText,
        rating: rating,
        images: images,
        accessToken: accessToken,
      }),
    onSuccess: (newReviewResponse) => {
      const newReview: GetProductIdReviewsDetail = newReviewResponse.data;

      queryClient.setQueryData<{
        pages: GetProductIdReviews[];
        pageParams: unknown[];
      }>(["reviews", product.id, "recent"], (oldData) => {
        if (!oldData) {
          return {
            pages: [
              {
                list: [newReview],
                nextCursor: null,
              },
            ],
            pageParams: [undefined],
          };
        }

        const newPages = oldData.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              list: [newReview, ...page.list],
            };
          }
          return page;
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });

      // 캐시 업데이트 후 실제 데이터 찍기
      queryClient.getQueryData(["reviews", product.id, "recent"]);

      setReviewCount(currentReviewCount + 1);
      const newAverageRating =
        (product.rating * currentReviewCount + newReview.rating) /
        (currentReviewCount + 1);

      setRating(newAverageRating);

      toast.success("리뷰가 등록되었습니다!");
      setReviewText("");
      setOpen(false);
    },

    onError: (error) => {
      console.log("onError:", error);
      toast.error("별점과 내용(10자 이상)을 입력해주세요.");
    },
  });
  // 리뷰 작성 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    const { isLoggedIn, accessToken } = await checkLoginStatus();
    if (!isLoggedIn || !accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    postReviewMutation.mutate({ accessToken });
  };

  const isSubmitEnabled = reviewText.trim().length > 0;

  return (
    <ReviewBaseModal
      isOpen={open}
      onClose={() => setOpen(false)}
      modalClassName="custom-modal-class"
      contentClassName="custom-content-class"
    >
      <div className="lg:w-full md:w-[510px] lg:h-full md:h-[552px] flex md:gap-[40px] gap-[20px] flex-col justify-between">
        <ProductIdGetModal />
        <div className="flex flex-col md:gap-[20px] gap-[10px] ">
          {/* 별점 입력 모달 */}
          <ProductReviewStarModal onChange={setRating} />
          {/* 리뷰 내용 입력 모달 */}
          <ProductReviewInputModal
            onTextChange={setReviewText}
            onImageUrlsChange={setImages}
          />
        </div>
        <BaseButton
          className="lg:py-[22px] md:py-[18px]  py-[15px]  text-[18px] font-semibold"
          disabled={!isSubmitEnabled}
          onClick={handleSubmit}
        >
          작성하기
        </BaseButton>
      </div>
    </ReviewBaseModal>
  );
}
