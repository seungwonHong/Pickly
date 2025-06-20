"use client";
import React, { useEffect, useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import useModalStore from "@/features/home/modals/store/modalStore";

type Props = {};

const CategoryDropDown = (props: Props) => {
  const {
    isClicked,
    setIsClicked,
    clickedValue,
    setClickedValue,
    setCategoryId,
  } = useModalStore();

  useEffect(() => {
    const categoryMap: Record<string, number> = {
      음악: 1,
      "영화/드라마": 2,
      "강의/책": 3,
      호텔: 4,
      "가구/인테리어": 5,
      식당: 6,
      전자기기: 7,
      화장품: 8,
      "의류/악세서리": 9,
      앱: 10,
    };

    const id = categoryMap[clickedValue];
    if (id !== undefined) {
      setCategoryId(id);
    }
  }, [clickedValue]);

  return (
    <div
      className={`relative flex flex-row items-center lg:mt-[20px] md:mt-[15px] mt-[10px] md:w-[360px] lg:h-[70px] md:h-[60px] w-full h-[55px] bg-[#252530] border-[1px] ${
        isClicked ? "border-[#5363FF]" : "border-[#353542]"
      } lg:px-[23px] lg:py-[20px] md:px-[20px] md:py-[21px] px-[20px] py-[18px] lg:text-[16px] text-[14px] text-[#6E6E82] font-normal rounded-lg cursor-pointer`}
      onClick={() => setIsClicked(!isClicked)}
    >
      <span>{clickedValue}</span>
      <RxTriangleDown size={22} className="ml-auto cursor-pointer" />

      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-[90px] left-0 flex flex-col w-full rounded-lg bg-[#252530] border-[1px] border-[#353542] p-[10px] text-[14px] font-normal text-[#6E6E82] "
          >
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("음악")}
            >
              음악
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("영화/드라마")}
            >
              영화/드라마
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("강의/책")}
            >
              강의/책
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("호텔")}
            >
              호텔
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("가구/인테리어")}
            >
              가구/인테리어
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("식당")}
            >
              식당
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("전자기기")}
            >
              전자기기
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("화장품")}
            >
              화장품
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("의류/악세서리")}
            >
              의류/악세서리
            </div>
            <div
              className="hover:bg-[#353542] hover:text-[#F1F1F5] px-[20px] py-[6px] rounded-lg cursor-pointer"
              onClick={() => setClickedValue("앱")}
            >
              앱
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDropDown;
