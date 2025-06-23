"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useProductIDStatsStore } from "@/features/productId/libs/useProductStatsStore";
import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";
import { useGetProductId } from "../../hooks/useGetProductId";
import { reviewService } from "../../api";

import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";
interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reviewId: number;
  deletedReviewRating: number;
}

export default function ProductReviewDelete({
  open,
  setOpen,
  reviewId,
  deletedReviewRating,
}: ProductReviewModalProps) {
  const { product } = useGetProductId();
  const setReviewCount = useProductIDStatsStore(
    (state) => state.setReviewCount
  );
  const currentReviewCount = useProductIDStatsStore(
    (state) => state.reviewCount[product?.id]
  );

  const setRating = useProductIDStatsStore((state) => state.setRating);
  const rating = useProductIDStatsStore((state) => state.rating[product?.id]);

  const queryClient = useQueryClient();

  // 상품 ID를 가져오기 위한 커스텀 훅 사용

  // 리뷰 patch 요청을 위한 useMutation 훅
  const deleteReviewMutation = useMutation({
    mutationFn: ({ accessToken }: { accessToken: string }) =>
      reviewService.deleteReviews(reviewId, accessToken),
    onSuccess: () => {
      if (product) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", product.id, "recent"],
        });

        if (currentReviewCount > 1) {
          const newCount = currentReviewCount - 1;
          const newAverageRating =
            (rating * currentReviewCount - deletedReviewRating) / newCount;

          setReviewCount(product.id, newCount);
          setRating(product.id, newAverageRating);
        } else {
          setReviewCount(product.id, 0);
          setRating(product.id, 0);
        }
      }
      toast.success("리뷰가 삭제되었습니다!");
      closeModal();
    },

    onError: () => {
      toast.error("리뷰 삭제에 실패했습니다.");
    },
  });

  // 리뷰 삭제
  const handleDeleteConfirm = async () => {
    const { accessToken } = await checkLoginStatus();
    if (!accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    if (!product) return;
    deleteReviewMutation.mutate({ accessToken });
  };

  // 모달 닫기
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <ProductComparePlusModal
        open={open}
        setOpen={setOpen}
        message="리뷰를 삭제하시겠습니까?"
        buttonText="삭제하기"
        onButtonClick={handleDeleteConfirm}
      />
    </>
  );
}
