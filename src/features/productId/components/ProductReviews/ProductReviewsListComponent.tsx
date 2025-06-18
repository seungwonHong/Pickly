"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import ThumbsUpButton from "@/components/shared/ThumbsUpButton";
import { formatDate } from "../../../../lib/utils/datetime";
import { GetProductIdReviewsDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";
import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";

import defaultImageProfile from "../../../../../public/defaultProfileImage.jpeg";
import Star from "../../../../../public/icons/star.svg";

const ProductReviewEditDelete = dynamic(
  () => import("./ProductReviewEditDelete")
);

export default function ProductReviewsListComponent({
  review,
}: {
  review: GetProductIdReviewsDetail;
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
      ? defaultImageProfile.src
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
            className="rounded-full "
            loading="lazy"
            unoptimized
          />
        </Link>
        <div>
          <div className="lg:text-[16px] text-[14px] font-medium">
            {review.user.nickname}
          </div>
          <div className="flex gap-[2px]">
            {Array.from({ length: review.rating }).map((_, idx) => (
              <Image
                key={idx}
                src={Star}
                alt="별점"
                width={20}
                height={20}
                loading="lazy"
                className="inline-block w-[12px] h-[12px]"
              />
            ))}
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
              <Image
                key={image.id}
                src={image.source}
                alt="리뷰 이미지"
                width={100}
                height={100}
                unoptimized
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
          />
        </div>
      </div>
    </div>
  );
}
