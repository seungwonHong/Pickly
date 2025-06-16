"use client";
import BaseButton from "@/components/shared/BaseButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/homepage");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="relative">
          <img
            src="/icons/404logo.png"
            alt="404Image"
            className="lg:w-[179px] lg:h-[159px] md:w-[150px] md:h-[130px] w-[120px] h-[100px]"
          />
          <motion.img
            src="/icons/tear.png"
            alt="tear"
            className="absolute lg:right-[30px] md:right-[30px] right-[20px] md:w-[22px] md:h-[33px] w-[16px] h-[28px] "
            initial={{ top: "10vh", opacity: 1, scale: 1 }}
            animate={{ top: "20vh", opacity: 0.7, scale: 1.3 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>

        <span className="lg:text-[64px] md:text-[48px] text-[36px] text-[#FFFFFF] font-extrabold lg:mt-[64px] md:mt-[36px] mt-[24px]">
          <span className="text-[#FF0000]">404</span> Not Found
        </span>
        <BaseButton
          className="lg:w-[440px] lg:h-[55px] md:w-[335px] md:h-[50px] w-[250px] h-[40px] lg:mt-[76px] md:mt-[36px] mt-[24px] md:text-[16px] text-[12px] font-extrabold"
          onClick={handleClick}
        >
          홈 화면으로 이동
        </BaseButton>
      </div>
    </div>
  );
}
