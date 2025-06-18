"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";
import { useGetProductId } from "../../hooks/useGetProductId";
import { reviewService } from "../../api";

const ProductComparePlusModal = dynamic(
  () => import("@/components/shared/ProductComparePlusModal")
);
interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reviewId: number;

  // sort?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined;
}

export default function ProductReviewDelete({
  open,
  setOpen,
  reviewId,
}: // sort = "recent",
ProductReviewModalProps) {
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
      if (product) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", product.id, "recent"],
        });
      }
    },
    onError: () => {
      toast.error("리뷰 삭제에 실패했습니다.");
    },
  });
  // const deleteReviewMutation = useMutation({
  //   mutationFn: ({ accessToken }: { accessToken: string }) =>
  //     reviewService.deleteReviews(reviewId, accessToken),
  //   onSuccess: () => {
  //     toast.success("리뷰가 삭제되었습니다!");
  //     closeModal();

  //     queryClient.setQueryData<{
  //       pages: GetProductIdReviews[];
  //       pageParams: unknown[];
  //     }>(["reviews", product.id, sort], (oldData) => {
  //       if (!oldData) return oldData;

  //       return {
  //         ...oldData,
  //         pages: oldData.pages.map((page) => ({
  //           ...page,
  //           list: page.list.filter((review) => review.id !== reviewId),
  //         })),
  //       };
  //     });
  //   },
  //   onError: () => {
  //     toast.error("리뷰 삭제에 실패했습니다.");
  //   },
  // });

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
