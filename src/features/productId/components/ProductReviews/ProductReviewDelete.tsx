"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD

import ProductComparePlusModal from "../../../../components/shared/ProductComparePlusModal";

=======
import toast from "react-hot-toast";

import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";

import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
<<<<<<< HEAD
    mutationFn: () => reviewService.deleteReviewsLike(reviewId),
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다!");
=======
    mutationFn: ({ accessToken }: { accessToken: string }) =>
      reviewService.deleteReviews(reviewId, accessToken),
    onSuccess: () => {
      toast.success("리뷰가 삭제되었습니다!");
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      closeModal();
      if (product) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", product.id, "recent"],
        });
      }
    },
    onError: () => {
<<<<<<< HEAD
      alert("리뷰 삭제에 실패했습니다.");
    },
  });
  // 리뷰 삭제
  const handleDeleteConfirm = () => {
    if (!product) return;
    deleteReviewMutation.mutate();
=======
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
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
