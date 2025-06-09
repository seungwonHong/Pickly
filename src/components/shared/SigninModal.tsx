import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import BaseButton from "@/components/shared/BaseButton";
import CloseX from "../../../public/icons/close-x.png";

interface ProductCompareChangeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SigninModal({
  open,
  setOpen,
}: ProductCompareChangeModalProps) {
  if (!open) return null;

  const onButtonClick = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  };

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
            className="w-[400px] h-[250px] bg-[#1C1C22] rounded-2xl flex flex-col items-center justify-between p-8 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CloseX}
              alt="close"
              className="cursor-pointer w-[24px] h-[24px] absolute top-[20px] right-[20px]"
              onClick={() => setOpen(false)}
            />

            <p className="text-white text-[24px] font-semibold text-center mt-8 w-max whitespace-pre-line">
              로그인이 필요한 서비스입니다.
            </p>

            <BaseButton
              className="w-full mt-6 py-[14px] text-[16px] font-semibold"
              onClick={onButtonClick}
            >
              로그인하러가기
            </BaseButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
