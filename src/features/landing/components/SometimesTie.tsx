"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BaseButton from "@/components/shared/BaseButton";
type Props = {};

const SometimesTie = (props: Props) => {
  return (
    <div className="flex flex-col lg:mt-[236px] md:mt-[160px] mt-[72px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="lg:text-[64px] md:text-[32px] text-[16px] font-extrabold text-white lg:ml-[135px]"
      >
        Sometimes Tie!
      </motion.h2>
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        src="/images/sometimesTie.png"
        alt="sometimesTieImage"
        className="md:flex hidden lg:w-[940px] lg:h-[645px] md:w-[684px] md:h-[638px] mx-auto lg:mt-[100px] md:mt-[32px]"
      />
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        src="/images/sometimesTieMobile.png"
        alt="sometimesTieMobileImage"
        className="md:hidden w-[335px] h-[628px] mx-auto mt-[27px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="lg:mt-[173px] md:mt-[79px] mt-[53px] mx-auto"
      >
        <Link
          href="/compare"
          className="flex items-center justify-center md:w-[153px] w-[100px] h-[33px] md:h-[47px] md:text-[20px] text-[12px] font-extrabold bg-gradient-to-r from-[#5097fa] to-[#5363ff] hover:scale-105 transition-transform duration-400 ease-in-out rounded-lg text-white"
        >
          Try it out
        </Link>
      </motion.div>
    </div>
  );
};

export default SometimesTie;
