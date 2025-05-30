"use client";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import BaseButton from "@/components/shared/BaseButton";
import useGetProductId from "../../hooks/useGetProductId";
import { reviewService } from "../../api";

import PlusImage from "../../../../../public/icons/plus-image.png";
import CloseX from "../../../../../public/icons/close-x.png";
export default function ProductReviewModal({
  open,
  setOpen,
  productUserId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productUserId: number;
}) {
  const [text, setText] = useState("");

  const { product } = useGetProductId();
  const postProductIdReview = useMutation({
    mutationFn: (data: { productId: number; content: string }) =>
      reviewService.postReviews(data.productId, data.content),
  });
  const handlePostReview = () => {
    if (text.trim() === "") {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    postProductIdReview.mutate(
      { productId: product.id, content: text },
      {
        onSuccess: () => {
          alert("리뷰가 작성되었습니다.");
          setOpen(false);
        },
        onError: (error) => {
          console.error("리뷰 작성 실패:", error);
          alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };
  if (!open || !product) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <div className="w-[620px] h-[698px] bg-[#1C1C22] rounded-2xl absolute flex flex-col items-end">
        <Image
          src={CloseX}
          alt="close"
          className="cursor-pointer w-[40px] h-[40px] relative top-[20px] right-[20px]"
          onClick={() => setOpen(false)}
        />
        <div className="w-full h-full flex gap-[40px] flex-col justify-between pt-[25px] pr-[40px] pb-[40px] pl-[40px]">
          <div className="flex flex-col gap-[10px]">
            <div>{product.category.name}</div>
            <div className="font-semibold text-[24px]">{product.name}</div>
          </div>
          <div className="flex flex-col gap-[20px] h-[360px]">
            <div className="flex gap-[20px] text-[16px] font-medium text-[#6E6E82]">
              <div>별점</div>
              <div>별점갯수</div>
            </div>
            <div>
              {/*인풋필드로 후에 교체*/}
              {""}
              <textarea
                className={`
            w-full outline-0 resize-none overflow-y-auto break-words 
            rounded-[8px] bg-[#252530] p-[20px] 
            placeholder-[var(--color-deepGray)] text-[var(--color-white)] 
           
            `}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="bg-[#252530] p-[63px] w-fit border border-[#353542] rounded-xl cursor-pointer">
              <Image
                src={PlusImage}
                alt="이미지추가 버튼"
                className="w-[34px] h-[34px] "
              />
            </div>
          </div>
          <BaseButton
            className="py-[22px] text-[18px] font-semibold"
            onClick={handlePostReview}
          >
            작성하기
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
