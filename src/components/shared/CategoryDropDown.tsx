"use client";
import React, { useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

const CategoryDropDown = (props: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`relative z-999 flex flex-row items-center md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] bg-[#252530] border-[1px] ${
        isClicked ? "border-[#5363FF]" : "border-[#353542]"
      } lg:px-[23px] lg:py-[20px] md:px-[20px] md:py-[21px] px-[20px] py-[18px] lg:text-[16px] text-[14px] text-[#6E6E82] font-normal rounded-lg lg:mt-[20px] md:mt-[15px] mt-[10px] cursor-pointer`}
      onClick={() => setIsClicked(!isClicked)}
    >
      <span>카테고리 선택</span>
      <RxTriangleDown size={22} className="ml-auto cursor-pointer" />

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[90px] left-0 flex flex-col md:w-[360px] w-[295px] rounded-lg bg-[#252530] border-[1px] border-[#353542] p-[10px] text-[14px] font-normal text-[#6E6E82] "
          >
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              음악
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              영화/드라마
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              강의/책
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              호텔
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              가구/인테리어
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              식당
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              전자기기
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              화장품
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              의류/악세서리
            </div>
            <div className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer">
              앱
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropDown;
