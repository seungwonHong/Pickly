"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewService } from "../api";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

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
      if (error instanceof AxiosError && error.response?.status === 401) {
        setShowLoginModal(true);
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
      if (error instanceof AxiosError && error.response?.status === 401) {
<<<<<<< HEAD
=======
        setShowLoginModal(true);
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      }
    },
  });

  // 쿠키 검증과 좋아요
  const toggleLike = async () => {
    const csrfToken = (await getCookie("csrf-token")) ?? "";

    const res = await fetch("/api/cookie", {
      method: "GET",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });

    if (!res.ok) {
      setShowLoginModal(true);
      return;
    }

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
