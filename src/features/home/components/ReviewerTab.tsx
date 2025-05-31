import React from "react";

type Props = {};

const ReviewerTab = (props: Props) => {
  return (
    <div className="flex flex-row lg:mb-[30px] lg:mr-0 md:mr-[20px] mr-[15px] shrink-0">
      <img
        src="/images/mockImage.png"
        alt="profileImage"
        className="lg:w-[42px] lg:h-[42px] w-[36px] h-[36px] rounded-full"
      />

      <div className="flex flex-col ml-[10px]">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center justify-center mr-[5px] lg:text-[12px] text-[10px] text-[#FF2F9F] font-normal lg:w-[32px] lg:h-[18px] w-[26px] h-[16px] rounded-[50px] bg-[#FF2F9F1A]">
            1등
          </div>
          <span className=" lg:text-[16px] text-[14px] text-white font-normal">
            리뷰왕
          </span>
        </div>

        <div className="flex flex-row items-center mt-[5px] text-[10px] text-deepGray font-light">
          <span> 팔로워 682</span>
          <span className="ml-[10px]">리뷰 398</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewerTab;
