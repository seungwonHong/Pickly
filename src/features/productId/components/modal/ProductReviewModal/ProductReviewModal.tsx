"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
=======
import toast from "react-hot-toast";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518

import { checkLoginStatus } from "../../../hooks/checkLogin";
import ProductReviewStarModal from "./ProductReviewStarModal";
import ProductIdGetModal from "./ProductIdGetModal";
import ProductReviewInputModal from "./ProductReviewInputModal";
import BaseButton from "@/components/shared/BaseButton";
import ReviewBaseModal from "./ReviewBaseModal";

import { useGetProductId } from "../../../hooks/useGetProductId";
import { reviewService } from "../../../api";

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProductReviewModal({
  open,
  setOpen,
}: ProductReviewModalProps) {
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);
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
<<<<<<< HEAD
=======
        accessToken: accessToken,
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      }),
    onSuccess: () => {
      toast.success("리뷰가 등록되었습니다!");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["reviews", product.id, "recent"],
      });
    },
    onError: () => {
      toast.error("별점과 내용을 입력해주세요.");
    },
  });
<<<<<<< HEAD
  const handleSubmit = () => {
    postReviewMutation.mutate();
=======
  // 리뷰 작성 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    const { accessToken } = await checkLoginStatus();
    if (!accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    postReviewMutation.mutate({ accessToken });
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  };

  const isSubmitEnabled = reviewText.trim().length > 0;

  return (
    <ReviewBaseModal
      isOpen={open}
      onClose={() => setOpen(false)}
      modalClassName="custom-modal-class"
      contentClassName="custom-content-class"
    >
      <div className="w-full h-full flex gap-[40px] flex-col justify-between">
        <ProductIdGetModal />
        <div className="flex flex-col gap-[20px] h-fit">
          {/* 별점 입력 모달 */}
          <ProductReviewStarModal onChange={setRating} />
          {/* 리뷰 내용 입력 모달 */}
          <ProductReviewInputModal
            onTextChange={setReviewText}
            onImageUrlsChange={setImages}
          />
        </div>
        <BaseButton
          className="py-[22px] text-[18px] font-semibold"
          disabled={!isSubmitEnabled}
          onClick={handleSubmit}
        >
          작성하기
        </BaseButton>
      </div>
    </ReviewBaseModal>
  );
}
