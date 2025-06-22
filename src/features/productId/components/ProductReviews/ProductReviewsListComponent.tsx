"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import ThumbsUpButton from "@/components/shared/ThumbsUpButton";
import { formatDate } from "../../../../lib/utils/datetime";
import { GetProductIdReviewsDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";
import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";

import defaultImageProfile from "../../../../../public/defaultProfileImage.jpeg";

const ProductReviewEditDelete = dynamic(
  () => import("./ProductReviewEditDelete")
);

export default function ProductReviewsListComponent({
  review,
  productId,
}: {
  review: GetProductIdReviewsDetail;
  productId: number;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = useGetUser();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const { isLoggedIn } = await checkLoginStatus();
      setIsLoggedIn(isLoggedIn);
    };

    fetchLoginStatus();
  }, []);

  const isOwner = isLoggedIn && user?.id === review.userId;

  const profileImageSrc =
    !review.user.image || review.user.image === "https://none"
      ? defaultImageProfile
      : review.user.image;

  return (
    <div className="text-[#F1F1F5] flex justify-between lg:p-[30px] p-[20px] bg-[#252530] rounded-2xl md:flex-row flex-col gap-[30px] md:gap-[0px]">
      <div className="flex items-start gap-[10px]">
        <Link href={`/users/${review.userId}`}>
          <Image
            width={43}
            height={43}
            src={profileImageSrc}
            alt="프로필 이미지"
            className="rounded-full w-[43px] h-[43px] object-cover"
            loading="lazy"
          />
        </Link>
        <div>
          <div className="lg:text-[16px] text-[14px] font-medium">
            {review.user.nickname}
          </div>
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((index) => {
              const score = review.rating;
              if (score >= index) {
                return (
                  <FaStar
                    key={index}
                    className="text-yellow-400 lg:w-4 lg:h-4 md:w-3 md:h-3"
                  />
                );
              } else if (score >= index - 0.5) {
                return (
                  <FaStarHalfAlt
                    key={index}
                    className="text-yellow-400 lg:w-4 lg:h-4 md:w-3 md:h-3"
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="lg:w-[680px] md:w-[455px] flex flex-col md:gap-[20px] gap-[10px]">
        <div className="lg:text-[16px] text-[12px] font-medium">
          {review.content}
        </div>

        {review.reviewImages.length > 0 && (
          <div className="flex lg:gap-[20px] gap-[10px]">
            {review.reviewImages.map((image) => (
              <img
                key={image.id}
                src={image.source}
                alt="리뷰 이미지"
                width={100}
                height={100}
                loading="lazy"
                className="lg:w-[100px] md:w-[80px] w-[60px] lg:h-[100px] md:h-[80px] h-[60px] rounded-xl"
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="flex gap-[20px] lg:text-[14px] text-[12px] md:text-[12px]">
            <div className="text-[#6E6E82]">{formatDate(review.createdAt)}</div>
            {isOwner && (
              <ProductReviewEditDelete
                reviewId={review.id}
                initialReviewData={review}
              />
            )}
          </div>

          <ThumbsUpButton
            reviewId={review.id}
            initialLikeCount={review.likeCount}
            initialIsLiked={review.isLiked}
            productId={productId}
          />
        </div>
      </div>
    </div>
  );
}
