"use client";
import Image from "next/image";
import useLikeButton from "../../features/productId/hooks/useLikeButton";

import ThumbsInactive from "../../../public/icons/thumbs-inactive.png";
import ThumbsActive from "../../../public/icons/thumbs-active.png";

export default function ThumbsUpButton({
  reviewId,
  initialLikeCount,
  initialIsLiked,
}: {
  reviewId: number;
  initialLikeCount: number;
  initialIsLiked: boolean;
}) {
  const { isLikedState, isLikeCount, toggleLike } = useLikeButton(
    reviewId,
    initialLikeCount,
    initialIsLiked
  );

  return (
    <button
      onClick={toggleLike}
      className={`flex gap-[5px] items-center justify-center lg:px-[12px] px-[10px] py-[6px]  border rounded-2xl cursor-pointer transition-all
        ${isLikedState ? "border-[#5363FF] bg-[#1F2235]" : "border-[#353542]"}
        hover:scale-105 active:scale-95`}
    >
      <Image
        src={isLikedState ? ThumbsActive : ThumbsInactive}
        alt="Thumbs Up Icon"
        className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] "
      />
      <div className="lg:text-[14px] text-[12px] text-[#5363FF] font-normal">
        {isLikeCount}
      </div>
    </button>
  );
}
