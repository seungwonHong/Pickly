import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


const CloseX = "/icons/close-x.png";

interface NoticeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message?: string;
}

export default function NoticeModal({
  open,
  setOpen,
  message,
}: NoticeModalProps) {
  if (!open) return null;
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
            className="w-[400px] h-[200px] bg-[#1C1C22] rounded-2xl flex flex-col items-center justify-center p-8 relative"
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

            <p className="text-white text-[20px] font-semibold text-center w-max whitespace-pre-line">
              {message}
            </p>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
