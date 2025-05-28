import React from "react";
import ReviewerTab from "./ReviewerTab";

type Props = {};

const ReviewerRanking = (props: Props) => {
  return (
    <div className="flex flex-col lg:px-[30px] lg:w-[250px] lg:ml-0 md:ml-[25px] lg:mt-0 md:mt-[45px]">
      <span className="lg:text-[16px] text-[14px] text-[#F1F1F5] font-normal lg:mt-[45px] mt-[30px]">
        리뷰어 랭킹
      </span>

     <div
       className="flex overflow-x-scroll scrollbar-hide lg:flex-col lg:mt-[30px] mt-[20px]"
     >
        <ReviewerTab />
        <ReviewerTab />
        <ReviewerTab />
        <ReviewerTab />
        <ReviewerTab />
        <ReviewerTab />
      </div>
    </div>
  );
};

export default ReviewerRanking;
