"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewService } from "../api";
import { AxiosError } from "axios";

export default function useLikeButton(
  reviewId: number,
  initialLikeCount: number,
  initialIsLiked: boolean = false
) {
  const [isLikedState, setIsLikedState] = useState(initialIsLiked);
  const [isLikeCount, setIsLikeCount] = useState(initialLikeCount);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const likeMutation = useMutation({
    mutationFn: () => reviewService.postReviewsLike(reviewId),
    onSuccess: () => {
      setIsLikedState(true);
      setIsLikeCount((prev) => prev + 1);
      setShowLoginModal(false);
    },
    onError: (error) => {
      console.log("Like/Unlike API Error:", error);
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 ||
          error.response?.data?.success === false
        ) {
          setShowLoginModal(true);
        }
      }
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => reviewService.deleteReviewsLike(reviewId),
    onSuccess: () => {
      setIsLikedState(false);
      setIsLikeCount((prev) => prev - 1);
      setShowLoginModal(false);
    },
    onError: (error) => {
      console.log("Like/Unlike API Error:", error);
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 ||
          error.response?.data?.success === false
        ) {
          setShowLoginModal(true);
        }
      }
    },
  });

  const toggleLike = () => {
    if (isLikedState) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
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
