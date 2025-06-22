"use client";
import BaseButton from "@/components/shared/BaseButton";
import { useRouter } from "next/navigation";
import abnormal from "@/../public/animations/Abnormal.json";
import Lottie from "lottie-react";

export default function ErrorPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/homepage");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-[200px] md:w-[250px]">
        <Lottie animationData={abnormal} loop={true} />
      </div>
        <p className="font-semibold text-3xl text-[var(--color-white)] -mt-[34px]">비정상적인 접근입니다.</p>

        <BaseButton
          className="lg:w-[440px] lg:h-[55px] md:w-[335px] md:h-[50px] w-[250px] h-[40px] lg:mt-[46px] md:mt-[16px] mt-[14px] md:text-[16px] text-[12px] font-extrabold"
          onClick={handleClick}
        >
          홈 화면으로 이동
        </BaseButton>
      </div>
    </div>
  );
}
