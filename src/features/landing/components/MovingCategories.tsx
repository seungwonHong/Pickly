"use client";
import CategoryChip from "@/components/CategoryChip";
import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useRef } from "react";

const MovingCategories = () => {
  const controls = useAnimationControls();
  const listRef = useRef<HTMLDivElement>(null);

  const categories = [
    { category: "음악", className: "w-[129px] !h-[60px] text-[24px]" },
    { category: "영화/드라마", className: "w-[218px] !h-[60px] text-[24px]" },
    { category: "강의/책", className: "w-[176px] !h-[60px] text-[24px]" },
    { category: "호텔", className: "w-[129px] !h-[60px] text-[24px]" },
    {
      category: "가구/인테리어",
      className: "w-[236px] !h-[60px] text-[24px]",
    },
    { category: "식당", className: "w-[129px] !h-[60px] text-[24px]" },
    { category: "전자기기", className: "w-[157px] !h-[60px] text-[24px]" },
    { category: "화장품", className: "w-[150px] !h-[60px] text-[24px]" },
    { category: "앱", className: "w-[120px] !h-[60px] text-[24px]" },
  ];

  useEffect(() => {
    const totalWidth = listRef.current ? listRef.current.scrollWidth / 2 : 0;
    controls.start({
      x: [0, -totalWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: categories.length * 4,
        },
      },
    });
  }, [controls, categories.length]);

  return (
    <div className="2xl:mt-[200px] lg:mt-[150px] md:mt-[100px] mt-[60px] overflow-x-hidden">
      <motion.div
        ref={listRef}
        animate={controls}
        className="flex flex-row h-[60px] items-center lg:gap-[65px] gap-[27px] w-fit"
      >
        {[...categories, ...categories].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`${item.className} mr-[15px]`}
            >
              <CategoryChip
                category={item.category}
                className={item.className}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
export default MovingCategories;
