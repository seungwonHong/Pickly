"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";
import { GetProductIdReviewsDetail } from "../../types";

import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";
import { useGetProductId } from "../../hooks/useGetProductId";
import { reviewService } from "../../api";

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reviewId: number;
  sort?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined;
}

export default function ProductReviewDelete({
  open,
  setOpen,
  reviewId,
  sort = "recent",
}: ProductReviewModalProps) {
  const queryClient = useQueryClient();

  // 상품 ID를 가져오기 위한 커스텀 훅 사용
  const { product } = useGetProductId();

  // 리뷰 patch 요청을 위한 useMutation 훅
  const deleteReviewMutation = useMutation({
    mutationFn: ({ accessToken }: { accessToken: string }) =>
      reviewService.deleteReviews(reviewId, accessToken),
    onSuccess: () => {
      toast.success("리뷰가 삭제되었습니다!");
      closeModal();
      queryClient.setQueryData(
        ["reviews", product.id, sort],
        (oldReviews: GetProductIdReviewsDetail[] | undefined) => {
          if (!oldReviews) return oldReviews;
          console.log("oldReviews", oldReviews);
          return oldReviews.filter((review) => review.id !== reviewId);
        }
      );
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
