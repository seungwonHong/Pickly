"use client";
import MoreProducts from "@/features/home/components/MoreProducts";
import React from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
}

const SearchPage = ({ setOpenSearch, search }: Props) => {
  return (
    <div className="flex flex-col items-center w-full mb-[60px]">
      <IoClose
        color="#F1F1F5"
        className="z-999 ml-auto cursor-pointer lg:w-[40px] lg:h-[40px] md:w-[36px] md:h-[36px] w-[24px] h-[24px]"
        onClick={() => setOpenSearch(false)}
      />

      <div className="mt-[30px] lg:mb-[50px] mb-[30px]">
        <MoreProducts keyword={search} queryKey={["search", search]} />
      </div>
    </div>
  );
};

export default SearchPage;
