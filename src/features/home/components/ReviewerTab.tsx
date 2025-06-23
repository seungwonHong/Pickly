import React from "react";
import { ReviewRanking } from "../services/getReviewerRanking";
import Link from "next/link";

interface Props {
  rank: ReviewRanking;
  rankNum: number;
}

const ReviewerTab = ({ rank, rankNum }: Props) => {
  let textColor;
  let bgColor;

  if (rankNum === 1) {
    textColor = "text-[#FF2F9F]";
    bgColor = "bg-[#FF2F9F1A]";
  } else if (rankNum === 2) {
    textColor = "text-[#05D58B]";
    bgColor = "bg-[#05D58B1A]";
  } else {
    textColor = "text-[#9FA6B2]";
    bgColor = "bg-[#9FA6B21A]";
  }

  return (
    <div className="flex flex-row lg:mb-[30px] shrink-0 lg:w-full">
      <Link href={`/users/${rank.id}`}>
        <img
          src={
            rank.image &&
            rank.image.startsWith("http") &&
            !["undefined", "null", "none"].some((s) =>
              rank.image.toLowerCase().includes(s)
            )
              ? rank.image
              : "/defaultProfileImage.jpeg"
          }
          alt="profileImage"
          className="lg:w-[42px] lg:h-[42px] w-[36px] h-[36px] rounded-full"
        />
      </Link>

      <div className="flex flex-col ml-[10px]">
        <div className="flex flex-row items-center">
          <div
            className={`flex flex-row items-center justify-center mr-[5px] lg:text-[12px] text-[10px] ${textColor} font-normal lg:w-[32px] lg:h-[18px] w-[26px] h-[16px] rounded-[50px] ${bgColor}`}
          >
            {rankNum}등
          </div>
          <Link
            href={`/users/${rank.id}`}
            className=" lg:text-[16px] text-[14px] text-white font-normal"
          >
            {rank.nickname}
          </Link>
        </div>

        <div className="flex flex-row items-center mt-[5px] text-[12px] text-deepGray font-light">
          <span> 팔로워 {rank.followersCount}</span>
          <span className="ml-[10px]">리뷰 {rank.reviewCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewerTab;
