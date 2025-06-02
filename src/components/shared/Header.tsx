import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between h-[100px] lg:px-[120px] lg:py-[36px] md:px-[30px] md:py-[28px] p-[23px]">
      <RxHamburgerMenu
        className="md:hidden cursor-pointer"
        size={24}
        color="#9FA6B2"
      />

      <Link
        href="/homepage"
        className="flex flex-row items-center justify-center"
      >
        <img
          src="/icons/logo.png"
          alt="logo"
          className="lg:w-[40px] lg:h-[40px] md:w-[32px] md:h-[32px] w-[24px] h-[24px]"
        />
        <span className="lg:text-[32px] md:text-[24px] text-[16px] font-extrabold lg:ml-[31px] md:ml-[16px] ml-[8px] text-white">
          Pickly
        </span>
      </Link>

      <div className="relative md:flex flex-row items-center justify-center lg:gap-[60px] md:gap-[30px] hidden">
        <input
          type="text"
          placeholder="상품 이름을 검색해 보세요"
          className="bg-[#252530] lg:w-[400px] lg:h-[56px] md:w-[300px] md:h-[50px] pr-[20px] pl-[60px] py-[16px] text-[#6E6E82] rounded-[28px]"
        />
        <CiSearch
          size={24}
          className="absolute lg:top-[16px] lg:left-[23px] md:top-[15px] md:left-[20px]"
          color="#9FA6B2"
        />
        <Link
          href=""
          className="lg:text-[16px] md:text-[14px] text-[#F1F1F5] font-normal"
        >
          비교하기
        </Link>
        <Link
          href="/mypage"
          className="lg:text-[16px] md:text-[14px] text-[#F1F1F5] font-normal"
        >
          내 프로필
        </Link>
      </div>

      <CiSearch
        size={24}
        className="md:hidden cursor-pointer"
        color="#9FA6B2"
      />
    </header>
  );
};

export default Header;
