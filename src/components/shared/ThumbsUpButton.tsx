"use client";
import Image from "next/image";
import useLikeButton from "../../features/productId/hooks/useLikeButton";

import ThumbsInactive from "../../../public/icons/thumbs-inactive.png";
import ThumbsActive from "../../../public/icons/thumbs-active.png";

export default function ThumbsUpButton() {
  const { isLikedState, islikeCount, toggleLike } = useLikeButton();

  return (
    <button
      onClick={toggleLike}
      className={`flex gap-[5px] items-center justify-center px-[12px] py-[6px] border rounded-2xl cursor-pointer transition-all
        ${isLikedState ? "border-[#5363FF] bg-[#1F2235]" : "border-[#353542]"}
        hover:scale-105 active:scale-95`}
    >
      <Image
        src={isLikedState ? ThumbsActive : ThumbsInactive}
        alt="Thumbs Up Icon"
        width={18}
        height={18}
      />
      <div className="text-[14px] text-[#5363FF] font-normal">
        {islikeCount}
      </div>
    </button>
  );
}
