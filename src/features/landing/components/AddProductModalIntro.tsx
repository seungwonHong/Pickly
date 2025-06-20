"use client";
import React from "react";
import { motion } from "framer-motion";

const AddProductModalIntro = () => {
  return (
    <div className="flex md:flex-row flex-col items-center lg:mt-[220px] md:mt-[140px] mt-[66px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col md:hidden justify-center mr-auto"
      >
        <div className="mr-auto">
          <h1 className="w-[65px] text-[32px] font-extrabold text-white">
            Add Your Product
          </h1>
        </div>
        <div className="w-[200px] mr-auto mt-[8px] leading-none">
          <span className="text-[12px] font-medium text-[#808080]">
            Fill out the form and share your own product to the community
          </span>
        </div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src="/images/addProductModalImage.png"
        alt="addddProductModalImage"
        className="lg:w-[620px] lg:h-[614px] w-[340px] h-[317px] md:mt-0 mt-[27px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:flex flex-col hidden justify-center md:ml-auto md:text-right"
      >
        <div className=" md:ml-auto">
          <h1 className="lg:w-[257px] md:w-[130px] lg:text-[64px] md:text-[32px] text-[16px] font-extrabold text-white">
            Add Your Product
          </h1>
        </div>
        <div className="lg:w-[415px] md:w-[208px] md:ml-auto lg:mt-[37px] md:mt-[11px]">
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-[#808080]">
            Fill out the form and share your own product to the community
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProductModalIntro;
