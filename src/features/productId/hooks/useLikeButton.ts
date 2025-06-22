"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewService, productService } from "../api";
import { AxiosError } from "axios";
import { checkLoginStatus } from "../hooks/checkLogin";
import { GetProductIdReviewsDetail } from "@/features/productId/types";
export default function useLikeButton(
  reviewId: number,
  initialLikeCount: number,
  initialIsLiked: boolean = false,
  productId: number
) {
  const [isLikedState, setIsLikedState] = useState(initialIsLiked);
  const [isLikeCount, setIsLikeCount] = useState(
    typeof initialLikeCount === "number" ? initialLikeCount : 0
  );
  const [showLoginModal, setShowLoginModal] = useState(false);

  const likeMutation = useMutation({
    mutationFn: (accessToken: string) =>
      reviewService.postReviewsLike(reviewId, accessToken),
    onSuccess: () => {
      setIsLikedState(true);
      setIsLikeCount((prev) => prev + 1);
      setShowLoginModal(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setShowLoginModal(true);
      }
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (accessToken: string) =>
      reviewService.deleteReviewsLike(reviewId, accessToken),
    onSuccess: () => {
      setIsLikedState(false);
      setIsLikeCount((prev) => prev - 1);
      setShowLoginModal(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setShowLoginModal(true);
      }
    },
  });

  // 쿠키 검증과 좋아요
  const toggleLike = async () => {
    const { accessToken } = await checkLoginStatus();

    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }

    if (isLikedState) {
      unlikeMutation.mutate(accessToken);
    } else {
      likeMutation.mutate(accessToken);
    }
  };
  useEffect(() => {
    async function fetchLikeStatus() {
      const { accessToken } = await checkLoginStatus();

      try {
        const res = await productService.getProductsIdReviews(
          productId,
          undefined,
          undefined,
          accessToken
        );
        const currentReview = res.data.list.find(
          (review: GetProductIdReviewsDetail) => review.id === reviewId
        );

        if (currentReview) {
          setIsLikedState(currentReview.isLiked);
          setIsLikeCount(currentReview.likeCount);
        }
      } catch (error) {
        console.error("리뷰 좋아요 상태 불러오기 실패:", error);
      }
    }

    fetchLikeStatus();
  }, [productId, reviewId]);
  return {
    isLikedState,
    isLikeCount,
    toggleLike,
    showLoginModal,
    setShowLoginModal,
    productId,
  };
}
