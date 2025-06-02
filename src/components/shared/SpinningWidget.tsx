"use client";
import React from "react";
import { motion } from "framer-motion";

const SpinningWidget = () => {
  return (
    <motion.div
      className="w-[20px] h-[20px] rounded-full border-[2px] border-t-gray-400 border-b-transparent border-l-transparent border-r-transparent mt-[50px]"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
    />
  );
};

export default SpinningWidget;
