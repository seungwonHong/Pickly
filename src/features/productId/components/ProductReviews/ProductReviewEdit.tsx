"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";
import { GetProductIdReviewsDetail } from "../../types";
import { useGetProductId } from "../../hooks/useGetProductId";
import { reviewService } from "../../api";
import { useProductIDStatsStore } from "../../libs/useProductStatsStore";

import BaseButton from "@/components/shared/BaseButton";
import ProductReviewStarModal from "../modal/ProductReviewModal/ProductReviewStarModal";
import ProductIdGetModal from "../modal/ProductReviewModal/ProductIdGetModal";
import ProductReviewInputModal from "../modal/ProductReviewModal/ProductReviewInputModal";
import ReviewBaseModal from "../modal/ProductReviewModal/ReviewBaseModal";

type ReviewImage = string | { id: number };

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reviewId: number;
  initialReviewData: GetProductIdReviewsDetail;
  editRating?: number;
}

export default function ProductReviewEdit({
  open,
  setOpen,
  reviewId,
  initialReviewData,
  editRating,
}: ProductReviewModalProps) {
  const queryClient = useQueryClient();

  const setGlobalRating = useProductIDStatsStore((state) => state.setRating);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState(initialReviewData.content);
  const [rating, setRating] = useState<number>(
    editRating ?? initialReviewData.rating
  );
  const [images, setImages] = useState<ReviewImage[]>(
    initialReviewData.reviewImages.map((img) => ({ id: img.id }))
  );

  // 상품 ID를 가져오기 위한 커스텀 훅 사용
  const { product } = useGetProductId();

  // 리뷰 patch 요청을 위한 useMutation 훅
  const patchReviewMutation = useMutation({
    mutationFn: async ({ accessToken }: { accessToken: string }) => {
      const formattedImages = images.map((img) =>
        typeof img === "string" ? { source: img } : { id: img.id }
      );

      return reviewService.patchReviews({
        reviewId,
        content: reviewText,
        rating: rating,
        images: formattedImages,
        accessToken,
      });
    },
    onSuccess: (res) => {
      const updatedReview = res.data;

      const state = useProductIDStatsStore.getState();

      const currentGlobalRating = state.rating[product.id] ?? product.rating;
      const currentReviewCount =
        state.reviewCount[product.id] ?? product.reviewCount ?? 0;

      if (product && currentReviewCount > 0) {
        const newAverageRating =
          (currentGlobalRating * currentReviewCount -
            initialReviewData.rating +
            updatedReview.rating) /
          currentReviewCount;

        setGlobalRating(product.id, newAverageRating);
      }

      toast.success("리뷰가 수정되었습니다!");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["reviews", product.id, "recent"],
      });
    },
    onError: (error) => {
      console.error("리뷰 수정 실패:", error.message);
      toast.error("리뷰 수정에 실패했습니다.");
    },
  });

  const handleSubmit = async () => {
    const { accessToken } = await checkLoginStatus();
    if (!accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    if (!product) return;
    await patchReviewMutation.mutateAsync({ accessToken });
  };

  const isSubmitEnabled = reviewText.trim().length > 0;

  useEffect(() => {
    async function fetchAccessToken() {
      const { accessToken } = await checkLoginStatus();
      setAccessToken(accessToken || null);
    }
    fetchAccessToken();
  }, []);

  useEffect(() => {
    setReviewText(initialReviewData.content);
    setRating(initialReviewData.rating);
    setImages(initialReviewData.reviewImages.map((img) => img.source));
  }, [initialReviewData]);

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
          <ProductReviewStarModal onChange={setRating} initialRating={rating} />
          {/* 리뷰 내용 입력 모달 */}
          <ProductReviewInputModal
            accessToken={accessToken}
            onTextChange={setReviewText}
            onImageUrlsChange={setImages}
            initialText={initialReviewData.content}
            initialImages={initialReviewData.reviewImages.map(
              (img) => img.source
            )}
          />
        </div>
        <BaseButton
          className="lg:py-[22px] md:py-[18px]  py-[15px]  text-[18px] font-semibold"
          disabled={!isSubmitEnabled}
          onClick={handleSubmit}
        >
          {patchReviewMutation.isPending ? "수정 중..." : "수정하기"}
        </BaseButton>
      </div>
    </ReviewBaseModal>
  );
}
