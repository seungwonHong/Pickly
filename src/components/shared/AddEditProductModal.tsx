"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { InputField } from "../input/InputField";
import CategoryDropDown from "./CategoryDropDown";
import { Textbox } from "../input/Textbox";
import BaseButton from "./BaseButton";
import { useRouter } from "next/navigation";

type Props = {};

const AddEditProductModal = (props: Props) => {
  const router = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="flex w-full h-full justify-center items-center bg-[#000000B2]"
      onClick={handleClose}
    >
      <div className="flex flex-col lg:w-[620px] lg:h-[614px] bg-[#1C1C22] rounded-2xl lg:p-[27px] p-[15px]">
        <IoClose
          size={24}
          color="#F1F1F5"
          className="ml-auto cursor-pointer"
          onClick={handleClose}
        />
        <span className="lg:text-[24px] text-[20px] text-[#F1F1F5] font-semibold">
          상품 추가
        </span>

        <div className="flex flex-row md:mt-[40px] mt-[20px]">
          <div className="flex flex-col lg:mr-[20px] md:mr-[15px]">
            <InputField
              className="md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px]"
              placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
            />
            <CategoryDropDown />
          </div>

          <div>
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center cursor-pointer lg:w-[160px] lg:h-[160px] md:w-[135px] md:h-[135px] w-[140px] h-[140px] rounded-lg bg-[#252530] border-[1px] border-[#353542] "
            >
              <img
                src="/icons/addImage.png"
                alt="addImageIcon"
                className="lg:w-[34px] lg:h-[34px] w-[24px] h-[24px]"
              />
            </label>
            <input type="file" name="file" id="fileInput" className="hidden" />
          </div>
        </div>

        <Textbox
          maxLength={500}
          className="lg:w-[540px] lg:h-[160px] rounded-lg bg-[#252530] border-[1px] border-[#353542] lg:mt-[20px]"
        />

        <BaseButton className="lg:w-[540px] lg:h-[65px] md:w-[510px] md:h-[55px] md:mt-[40px] mt-[20px] lg:text-[18px] text-[16px] font-semibold rounded-lg">
          추가하기
        </BaseButton>
      </div>
    </div>
  );
};

export default AddEditProductModal;
