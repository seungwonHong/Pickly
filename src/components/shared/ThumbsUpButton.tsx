"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

import useLikeButton from "../../features/productId/hooks/useLikeButton";
import { useRouter } from "next/navigation";
import ThumbsInactive from "../../../public/icons/thumbs-inactive.png";
import ThumbsActive from "../../../public/icons/thumbs-active.png";

const ProductComparePlusModal = dynamic(
  () => import("./ProductComparePlusModal")
);
export default function ThumbsUpButton({
  reviewId,
  initialLikeCount,
  initialIsLiked,
  productId,
}: {
  reviewId: number;
  initialLikeCount: number;
  initialIsLiked: boolean;
  productId: number;
}) {
  const router = useRouter();
  const {
    isLikedState,
    isLikeCount,
    toggleLike,
    showLoginModal,
    setShowLoginModal,
  } = useLikeButton(reviewId, initialLikeCount, initialIsLiked, productId);

  return (
    <>
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
      <ProductComparePlusModal
        open={showLoginModal}
        setOpen={setShowLoginModal}
        message="로그인이 필요한 서비스입니다."
        buttonText="로그인하러 가기"
        onButtonClick={() => {
          setShowLoginModal(false);
          router.push("/signin");
        }}
      />
    </>
  );
}
