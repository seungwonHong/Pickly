"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import BaseButton from "@/components/shared/BaseButton";

import useGetProductId from "../../../hooks/useGetProductId";
import { reviewService } from "../../../api";

import CloseX from "../../../../../../public/icons/close-x.png";

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProductCompareChangeModal({
  open,
  setOpen,
}: ProductReviewModalProps) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);

  // 상품 ID를 가져오기 위한 커스텀 훅 사용
  const { product } = useGetProductId();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-[620px] h-[698px] bg-[#1C1C22] rounded-2xl absolute flex flex-col items-end"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CloseX}
              alt="close"
              className="cursor-pointer w-[40px] h-[40px] relative top-[20px] right-[20px]"
              onClick={() => setOpen(false)}
            />
            <div className="w-full h-full flex gap-[40px] flex-col justify-between pt-[25px] pr-[40px] pb-[40px] pl-[40px]">
              <BaseButton
                className="py-[22px] text-[18px] font-semibold"
                disabled={!isSubmitEnabled}
                onClick={handleSubmit}
              >
                작성하기
              </BaseButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
