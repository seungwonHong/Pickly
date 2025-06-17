"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewService } from "../api";
import { AxiosError } from "axios";
import { checkLoginStatus } from "../hooks/checkLogin";

export default function useLikeButton(
  reviewId: number,
  initialLikeCount: number,
  initialIsLiked: boolean = false
) {
  const [isLikedState, setIsLikedState] = useState(initialIsLiked);
  const [isLikeCount, setIsLikeCount] = useState(initialLikeCount);
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

  return {
    isLikedState,
    isLikeCount,
    toggleLike,
    showLoginModal,
    setShowLoginModal,
  };
}
