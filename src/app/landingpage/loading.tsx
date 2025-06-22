"use client";
import React from "react";
import Lottie from "lottie-react";
import paperplane from "@/../public/animations/paperplane.json";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[300px] h-[200px] lg:w-[600px] lg:h-[300px] md:w-[450px] md:h-[250px]">
        <Lottie animationData={paperplane} loop={true} />
      </div>

      <span className="lg:text-[64px] text-[32px] lg:mt-[60px] md:mt-[30px] mt-[5px] font-extrabold text-white">
        Loading...
      </span>
      <span className="lg:text-[24px] text-[12px] text-white font-medium">
        잠시만 기다려주세요!
      </span>
    </div>
  );
};

export default Loading;
