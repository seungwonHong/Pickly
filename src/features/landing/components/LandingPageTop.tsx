import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

type Props = {};

const LandingPageTop = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="lg:text-[128px] md:text-[64px] text-[32px] lg:mt-[46px] md:mt-[88px] mt-[65px] font-extrabold bg-gradient-to-r from-[#5097fa] to-[#5363ff] bg-clip-text text-transparent">
        Pickly
      </h1>
      <div className="lg:w-[1263px] md:w-[696px] w-[327px] lg:mt-[23px] md:mt-[32px] mt-[6px]">
        <span className="lg:text-[20px] md:text-[12px] text-[6px] font-medium text-center block">
          Pickly is a next-generation product discovery platform where quality
          meets curation. Whether you’re searching for the latest gadgets,
          everyday essentials, or hidden gems, Pickly connects you with
          handpicked items trusted by real users.
        </span>
      </div>

      <div className="flex flex-row  lg:gap-[56px] md:gap-[42px] lg:mt-[67px] md:mt-[32px] mt-[20px] gap-[16px]">
        <Link href="/signin">
          <BaseButton className="lg:w-[134px] lg:h-[47px] md:w-[110px] md:h-[39px] w-[53px] h-[22px] lg:text-[20px] md:text-[16px] text-[8px] font-extrabold">
            Login
          </BaseButton>
        </Link>

        <Link href="/signin">
          <TypeButton className="lg:w-[156px] lg:h-[47px] md:w-[134px] md:h-[39px] w-[74px] h-[22px] lg:text-[20px] md:text-[16px] text-[8px] font-extrabold">
            <span className="flex flex-row items-center">
              Explore
              <FaArrowRight
                color="#FFFFFF"
                className="lg:w-[16px] lg:h-[20px] lg:ml-[15px] md:w-[12px] md:h-[12px] w-[6px] h-[6px] md:ml-[8px] ml-[4px]"
              />
            </span>
          </TypeButton>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageTop;
