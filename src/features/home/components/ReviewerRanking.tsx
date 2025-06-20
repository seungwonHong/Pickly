import React from "react";
import ReviewerTab from "./ReviewerTab";
import getReviewerRanking from "../services/getReviewerRanking";

const ReviewerRanking = async () => {
  const ranking = await getReviewerRanking();

  return (
    <div className="flex flex-col lg:max-w-[250px] lg:w-[15vw] lg:ml-0 lg:mt-0 md:mt-[40px]">
      <span className="lg:text-[16px] text-[14px] text-[#F1F1F5] font-normal lg:mt-[45px]">
        리뷰어 랭킹
      </span>

      <div className="flex overflow-x-scroll scrollbar-hide lg:gap-0 gap-[20px] lg:flex-col lg:mt-[30px] mt-[20px]">
        {ranking.slice(0, 5).map((rank, index) => (
          <ReviewerTab key={rank.id} rank={rank} rankNum={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default ReviewerRanking;
