import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#D9D9D91A] lg:px-[160px] px-[24px] lg:h-[758px] lg:mt-[76px] md:mt-[47px] mt-[53px] pb-[20px]">
      <div className="flex flex-row justify-between">
        {/* Contributors */}
        <div className="flex flex-col lg:mt-[70px] md:mt-[35px] mt-[17px]">
          <h3 className="lg:text-[36px] md:text-[18px] text-[9px] font-extrabold text-white">
            Contributors
          </h3>
          <Link
            href="https://github.com/seungwonHong"
            className="flex flex-row items-center lg:mt-[40px] md:mt-[26px] mt-[10px] hover:scale-110 transition-transform duration-450 ease-in-out"
          >
            <img
              src="/images/hongseungwon.jpeg"
              alt="hswImage"
              className="lg:w-[48px] lg:h-[48px] md:w-[24px] md:h-[24px] w-[12px] h-[12px] rounded-full"
            />
            <span className="lg:ml-[28px] md:ml-[14px] ml-[8px] lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white">
              Hong.Seung.Won
            </span>
          </Link>
          <Link
            href="https://github.com/songmijin824"
            className="flex flex-row items-center lg:mt-[28px] md:mt-[20px] mt-[7px] hover:scale-110 transition-transform duration-450 ease-in-out"
          >
            <img
              src="/images/미진님프사.jpeg"
              alt="미진님프사"
              className="lg:w-[48px] lg:h-[48px] md:w-[24px] md:h-[24px] w-[12px] h-[12px] rounded-full"
            />
            <span className="lg:ml-[28px] md:ml-[14px] ml-[8px] lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white">
              Song.Mi.Jin
            </span>
          </Link>
          <Link
            href="https://github.com/prkhaeun"
            className="flex flex-row items-center lg:mt-[28px] md:mt-[20px] mt-[7px] hover:scale-110 transition-transform duration-450 ease-in-out"
          >
            <img
              src="/images/하은님프사.jpeg"
              alt="하은님프사"
              className="lg:w-[48px] lg:h-[48px] md:w-[24px] md:h-[24px] w-[12px] h-[12px] rounded-full"
            />
            <span className="lg:ml-[28px] md:ml-[14px] ml-[8px] lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white">
              Park.Ha.Eun
            </span>
          </Link>
          <Link
            href="https://github.com/sssson0"
            className="flex flex-row items-center lg:mt-[28px] md:mt-[20px] mt-[7px] hover:scale-110 transition-transform duration-450 ease-in-out"
          >
            <img
              src="/images/혁진님프사.jpeg"
              alt="혁진님프사"
              className="lg:w-[48px] lg:h-[48px] md:w-[24px] md:h-[24px] w-[12px] h-[12px] rounded-full"
            />
            <span className="lg:ml-[28px] md:ml-[14px] ml-[8px] lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white">
              Son.Hyuk.Jin
            </span>
          </Link>
          <Link
            href="https://github.com/ramong26"
            className="flex flex-row items-center lg:mt-[28px] md:mt-[20px] mt-[7px] hover:scale-110 transition-transform duration-450 ease-in-out"
          >
            <img
              src="/images/수연님프사.jpeg"
              alt="수연님프사"
              className="lg:w-[48px] lg:h-[48px] md:w-[24px] md:h-[24px] w-[12px] h-[12px] rounded-full"
            />
            <span className="lg:ml-[28px] md:ml-[14px] ml-[8px] lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white">
              Kim.Soo.Yeon
            </span>
          </Link>
        </div>

        {/* Contacts */}
        <div className="flex flex-col lg:mt-[70px] md:mt-[35px] mt-[17px]">
          <h3 className="lg:text-[36px] md:text-[18px] text-[9px] font-extrabold text-white">
            Contacts
          </h3>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[40px] md:mt-[26px] mt-[10px]">
            ✉️ nonamed814@gmail.com
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            ✉️ alwls824@gmail.com
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            ✉️ haeun00415@gmail.com
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            ✉️ seanpaul0904@naver.com
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            ✉️ rlatndus21049@gmail.com
          </span>
        </div>

        {/* Github */}
        <div className="flex flex-col lg:mt-[70px] md:mt-[35px] mt-[17px]">
          <h3 className="lg:text-[36px] md:text-[18px] text-[9px] font-extrabold text-white">
            Github
          </h3>
          <Link
            href="https://github.com/part4-team6/Pickly"
            className="flex flex-row items-center lg:mt-[40px] md:mt-[26px] mt-[10px] hover:scale-110 transition-transform duration-450 ease-in-out"
          >
            <img
              src="/icons/logo.png"
              alt="logo"
              className="lg:w-[32px] lg:h-[27px] md:w-[16px] md:h-[14px] w-[8px] h-[7px]"
            />
            <span className="lg:ml-[22px] md:ml-[15px] ml-[8px] lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white">
              Pickly
            </span>
          </Link>
        </div>

        {/* Texh Stack */}
        <div className="flex flex-col lg:mt-[70px] md:mt-[35px] mt-[17px]">
          <h3 className="lg:text-[36px] md:text-[18px] text-[9px] font-extrabold text-white">
            Tech Stack
          </h3>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[40px] md:mt-[26px] mt-[10px]">
            React
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            Next.js
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            Typescript
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            Tanstack Query
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            Framer Motion
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            TailWind CSS
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            Zustand
          </span>
          <span className="lg:text-[24px] md:text-[12px] text-[6px] font-medium text-white lg:mt-[28px] md:mt-[20px] mt-[7px]">
            API Routes
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
