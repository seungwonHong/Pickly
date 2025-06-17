"use client";
import Lottie from "lottie-react";
import paperplane from "@/../public/animations/paperplane.json";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {};

const Loading = (props: Props) => {
  const pathname = usePathname();

  // 동적 라우팅일 경우 로딩 페이지 숨김
  if (pathname !== "/homepage") {
    throw new Promise(() => {});
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[200px] h-[100px] lg:w-[600px] lg:h-[300px] md:w-[450px] md:h-[250px]">
        <Lottie animationData={paperplane} loop={true} />
      </div>

      <span className="lg:text-[64px] md:text-[32px] text-[16px] lg:mt-[60px] md:mt-[30px] mt-[15px] font-extrabold text-white">
        Loading...
      </span>
      <span className="lg:text-[24px] md:text-[12px] text-[6px] text-white font-medium">
        잠시만 기다려주세요!
      </span>
    </div>
  );
};

export default Loading;
