"use client";
import React from "react";
import { motion } from "framer-motion";

const SometimesWin = () => {
  return (
    <div className="flex flex-col lg:mt-[236px] md:mt-[160px] mt-[72px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="lg:text-[64px] md:text-[32px] text-[16px] font-extrabold text-white lg:ml-[135px]"
      >
        Sometimes Win!
      </motion.h2>
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        src="/images/sometimesWin.png"
        alt="sometimesWinImage"
        className="md:flex hidden lg:w-[940px] lg:h-[684px] md:w-[684px] md:h-[700px] mx-auto lg:mt-[100px] md:mt-[32px]"
      />
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        src="/images/sometimesWinMobile.png"
        alt="sometimesWinMobileImage"
        className="md:hidden w-[335px] h-[690px] mx-auto mt-[27px]"
      />
    </div>
  );
};

export default SometimesWin;
