import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

type Props = {};

const LandingPageTop = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:mt-[46px] md:mt-[88px] mt-[65px] flex space-x-1">
        {"Pickly".split("").map((char, i) => (
          <span
            key={i}
            className="lg:text-[128px] text-[64px] font-extrabold text-transparent bg-gradient-to-r from-[#5097fa] to-[#5363ff] bg-clip-text transition-transform duration-500 hover:scale-125 cursor-pointer"
          >
            {char}
          </span>
        ))}
      </div>
      <div className="lg:w-[1263px] md:w-[696px] w-[327px] lg:mt-[23px] md:mt-[32px] mt-[6px]">
        <span className="text-white lg:text-[20px] text-[12px] font-medium text-center block">
          Pickly is a next-generation product discovery platform where quality
          meets curation. Whether you’re searching for the latest gadgets,
          everyday essentials, or hidden gems, Pickly connects you with
          handpicked items trusted by real users.
        </span>
      </div>

      <div className="flex flex-row items-center lg:gap-[56px] md:gap-[42px] lg:mt-[67px] md:mt-[32px] mt-[20px] gap-[32px]">
        <Link
          href="/signin"
          className="flex flex-row items-center justify-center lg:w-[134px] lg:h-[47px] w-[110px] h-[39px] lg:text-[20px] text-[16px] font-extrabold bg-gradient-to-r from-[#5097fa] to-[#5363ff] hover:scale-105 transition-transform duration-400 ease-in-out rounded-lg text-white"
        >
          Login
        </Link>

        <Link
          href="/homepage"
          className="flex flex-row items-center justify-center lg:w-[156px] lg:h-[47px] w-[134px] h-[39px] lg:text-[20px] text-[16px] font-extrabold border-[2px] border-[#757AFF] rounded-lg hover:scale-105 transition-transform duration-400 ease-in-out"
        >
          <span className="flex flex-row items-center text-white">
            Explore
            <FaArrowRight
              color="#FFFFFF"
              className="lg:w-[16px] lg:h-[20px] lg:ml-[15px] w-[12px] h-[12px] ml-[8px]"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageTop;
