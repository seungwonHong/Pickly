import Image from "next/image";
import React from "react";

type Props = {};

const HomePagePreview = (props: Props) => {
  return (
    <div className="flex flex-col lg:mt-[150px] md:mt-[120px] mt-[82px]">
      <div className="lg:w-[545px] w-[280px]">
        <h1 className="text-white lg:text-[64px] text-[32px] font-extrabold">
          Meet various Kind of products
        </h1>
      </div>

      <Image
        width={1629}
        height={766}
        src={"/images/homepageDesktop.png"}
        alt="homepagePreview"
        className="mt-[90px] lg:flex hidden mx-auto"
      />
      <Image
        width={458}
        height={510}
        src={"/images/homepageTablet.png"}
        alt="homepagePreview"
        className="mt-[48px] lg:hidden md:flex hidden mx-auto"
      />
      <Image
        width={298}
        height={379}
        src={"/images/homepageMobile.png"}
        alt="homepagePreview"
        className="mt-[30px] md:hidden mx-auto"
      />
    </div>
  );
};

export default HomePagePreview;
