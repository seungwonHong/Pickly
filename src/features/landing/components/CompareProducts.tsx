"use client";
import React from "react";
import { motion } from "framer-motion";

const CompareProducts = () => {
  return (
    <div className="flex flex-col lg:mt-[346px] md:mt-[146px] mt-[76px]">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:text-[64px] text-[32px] font-extrabold text-white"
      >
        Compare Products
      </motion.h1>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="lg:text-[20px] text-[12px] font-medium text-[#808080] lg:w-[480px] w-[260px] lg:mt-[35px] md:mt-[10px] mt-[8px]"
      >
        Choose products to compare features, ratings, and more. Make smarter
        decisions with side-by-side insights.
      </motion.span>

      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        src="/images/compareProduct.png"
        alt="compareProductImage"
        className="md:flex hidden lg:mt-[100px] md:mt-[34px] lg:w-[940px] lg:h-[275px] md:w-[648px] md:h-[250px] mx-auto"
      />
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        src="/images/compareProductMobile.png"
        alt="compareProductImageMobile"
        className="md:hidden mt-[27px] w-[335px] h-[362px] mx-auto"
      />
    </div>
  );
};

export default CompareProducts;
