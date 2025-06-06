"use client";
import Category from "@/features/home/components/Category";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSearchParams } from "next/navigation";
import SearchPage from "./SearchPage";
import useAuthentication from "@/features/header/hooks/useAuthentication";
import useResize from "@/features/header/hooks/useResize";
import useBlockScroll from "@/features/header/hooks/useBlockScroll";

const Header = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const params = useParams();
  const categoryId = params?.id as string;
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthentication();

  const { clicked, setClicked } = useResize();
  const { openSearch, setOpenSearch } = useBlockScroll();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(inputValue);
    setOpenSearch(true);
    setInputValue("");
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-row items-center justify-between md:h-[100px] h-[70px] lg:px-[120px] lg:py-[36px] md:px-[30px] md:py-[28px] p-[23px] ${
          searchParams.get("modal") === "true"
            ? "bg-[#000000B2]"
            : "bg-[#1C1C22]"
        }`}
      >
        <RxHamburgerMenu
          className="md:hidden cursor-pointer"
          size={24}
          color="#9FA6B2"
          onClick={handleClick}
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
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="상품 이름을 검색해 보세요"
              className="bg-[#252530] lg:w-[400px] lg:h-[56px] md:w-[300px] md:h-[50px] pr-[20px] pl-[60px] py-[16px] text-[#6E6E82] rounded-[28px]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
          <CiSearch
            size={24}
            className="absolute lg:top-[16px] lg:left-[23px] md:top-[15px] md:left-[20px]"
            color="#9FA6B2"
          />
          {isAuthenticated ? (
            <>
              <Link
                href="/compare"
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
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="lg:text-[16px] md:text-[14px] text-[#F1F1F5] font-normal"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="lg:text-[16px] md:text-[14px] text-[#F1F1F5] font-normal"
              >
                회원가입
              </Link>
            </>
          )}
        </div>

        <CiSearch
          size={24}
          className="md:hidden cursor-pointer"
          color="#9FA6B2"
        />
      </div>

      <div className="border-[1px] border-[#252530] w-full"></div>

      {clicked && (
        <div
          className="fixed h-full w-full bg-[#25253080] md:hidden"
          onClick={() => setClicked(false)}
        >
          <Category categoryId={categoryId} />
        </div>
      )}

      {openSearch && (
        <div className="fixed flex-col bg-[#000000B2] w-full h-full flex items-center p-[20px] overflow-y-auto">
          <SearchPage setOpenSearch={setOpenSearch} search={search} />
        </div>
      )}
    </div>
  );
};

export default Header;
