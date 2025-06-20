"use client";
import React from "react";
import { motion } from "framer-motion";

const AddReviewModalIntro = () => {
  return (
    <div className="flex md:flex-row flex-col items-center lg:mt-[346px] md:mt-[135px] mt-[76px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col md:mr-auto md:ml-0 ml-auto justify-center md:text-left text-right"
      >
        <div>
          <h1 className="lg:w-[257px] w-[130px] md:ml-0 ml-auto lg:text-[64px] text-[32px] font-extrabold text-white">
            Add Your Review
          </h1>
        </div>
        <div className="lg:w-[415px] w-[208px] md:ml-0 lg:mt-[37px] md:mt-[11px] leading-none">
          <span className="lg:text-[24px] text-[12px] font-medium text-[#808080]">
            Share your thoughts and help others discover great products.
          </span>
        </div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src="/images/reviewModalImage.png"
        alt="addddProductModalImage"
        className="lg:w-[620px] lg:h-[698px] w-[343px] h-[430px] md:mt-0 mt-[27px]"
      />
    </div>
  );
};

export default AddReviewModalIntro;
