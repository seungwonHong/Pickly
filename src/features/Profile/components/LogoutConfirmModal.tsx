"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import BaseButton from "@/components/shared/BaseButton";
import CloseX from "../../../../public/closeButton.png";

interface LogoutConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({
  open,
  onCancel,
  onConfirm,
}: LogoutConfirmModalProps) {
  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onCancel}
        >
          <motion.div
            className="md:w-[400px] w-[300px] md:h-[230px] h-[180px] bg-[#1C1C22] rounded-2xl flex flex-col items-center justify-between p-8 relative"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CloseX}
              alt="닫기"
              width={24}
              height={24}
              className="cursor-pointer w-[20px] h-[20px] md:w-[24px] md:h-[24px] absolute top-[20px] right-[20px]"
              onClick={onCancel}
            />

            <p className="text-white text-[16px] md:text-[20px]  font-semibold text-center md:mt-8 mt-4 w-max whitespace-pre-line">
              로그아웃 하시겠습니까?
            </p>

            <BaseButton
              onClick={onConfirm}
              className="w-full mt-6 py-[14px] text-[16px] font-semibold"
            >
              확인
            </BaseButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
