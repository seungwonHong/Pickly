import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import BaseButton from "@/components/shared/BaseButton";
import CloseX from "../../../public/icons/close-x.png";

interface ProductCompareChangeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function ProductComparePlusModal({
  open,
  setOpen,
  message,
  buttonText = "확인",
  onButtonClick,
}: ProductCompareChangeModalProps) {
  if (!open) return null;
  return createPortal(
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
            className="md:w-[400px] w-[300px] md:h-[250px] h-[200px] bg-[#1C1C22] rounded-2xl flex flex-col items-center justify-between md:p-8 p-6 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CloseX}
              alt="close"
              width={24}
              height={24}
              className="cursor-pointer w-[24px] h-[24px] absolute top-[20px] right-[20px]"
              onClick={() => setOpen(false)}
            />

            <p className="text-white md:text-[20px]  text-[18px] font-semibold text-center md:mt-8 mt-6 w-max whitespace-pre-line">
              {message}
            </p>

            <BaseButton
              className="w-full mt-6 py-[14px] md:text-[16px] text-[12px] font-semibold"
              onClick={() => {
                if (onButtonClick) {
                  onButtonClick();
                } else {
                  setOpen(false);
                }
              }}
            >
              {buttonText || "확인"}
            </BaseButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
