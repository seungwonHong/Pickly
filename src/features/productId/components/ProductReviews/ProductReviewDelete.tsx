"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import ProductComparePlusModal from "../../../../components/shared/ProductComparePlusModal";

import { checkLoginStatus } from "../../hooks/checkLogin";
import useGetProductId from "../../hooks/useGetProductId";
import { reviewService } from "../../api";

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reviewId: number;
}

export default function ProductReviewDelete({
  open,
  setOpen,
  reviewId,
}: ProductReviewModalProps) {
  const queryClient = useQueryClient();

  // 상품 ID를 가져오기 위한 커스텀 훅 사용
  const { product } = useGetProductId();

  // 리뷰 patch 요청을 위한 useMutation 훅
  const deleteReviewMutation = useMutation({
    mutationFn: ({ accessToken }: { accessToken: string }) =>
      reviewService.deleteReviews(reviewId, accessToken),
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다!");
      closeModal();

      if (product) {
        const queryKey = ["reviews", product.id, "recent"];

        // ✅ 먼저 UI에서 즉시 제거
        queryClient.setQueryData(queryKey, (oldData: any) => {
          console.log("Old review data:", oldData);
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              list: page.list.filter((review: any) => review.id !== reviewId),
            })),
          };
        });

        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey });
        }, 500);
      }
    },
    onError: () => {
      alert("리뷰 삭제에 실패했습니다.");
    },
  });
  // 리뷰 삭제
  const handleDeleteConfirm = async () => {
    const { accessToken } = await checkLoginStatus();
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

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
