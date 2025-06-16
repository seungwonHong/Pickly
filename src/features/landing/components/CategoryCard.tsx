"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
  category: string;
  img: string;
  description: string;
  color: string;
  url: string;
}

const CategoryCard = ({ category, img, description, color, url }: Props) => {
  return (
    <Link href={url}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ scale: 1.03 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`flex flex-col lg:w-[517px] lg:h-[517px] md:w-[221px] md:h-[221px] w-[98px] h-[98px] rounded-lg bg-cover cursor-pointer`}
        style={{ backgroundImage: `url(${img})`, transformOrigin: "bottom" }}
      >
        <div className="relative flex flex-col bg-[#D9D9D980] rounded-b-lg lg:h-[146px] md:h-[73px] h-[36px] mt-auto lg:px-[19px] px-[4px]">
          <h2 className="mt-0 text-black lg:text-[48px] md:text-[16px] text-[8px] font-extrabold">
            {category}
          </h2>
          <span className="text-black lg:w-[379px] lg:text-[20px] md:text-[8px] text-[4px] font-medium leading-tight">
            {description}
          </span>

          <button
            style={{ background: color }}
            className={`absolute flex items-center justify-center lg:right-[17px] lg:bottom-[17px] md:right-[5px] md:bottom-[5px] right-[3px] bottom-[3px] lg:w-[48px] lg:h-[48px] md:w-[24px] md:h-[24px] w-[12px] h-[12px] rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out`}
          >
            <FaArrowRight
              className="lg:w-[14px] lg:h-[14px] md:w-[8px] md:h-[8px] w-[4px] h-[4px]"
              color="#000000"
            />
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
