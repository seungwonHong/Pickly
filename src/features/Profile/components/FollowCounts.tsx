"use client";

import { useState } from "react";
import FollowListModal from "./FollowListModal";
import { User } from "../types/user";

export default function FollowCounts({ user }: { user: User }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "followees">(
    "followers"
  );

  return (
    <>
      <div className="w-full px-[51px] flex justify-between relative md:px-[108px] lg:px-[58px]">
        <div
          className="flex flex-col items-center gap-[5px] cursor-pointer"
          onClick={() => {
            setModalType("followers");
            setIsModalOpen(true);
          }}
        >
          <span className="text-[18px] font-semibold text-white lg:text-[20px]">
            {user.followersCount}
          </span>
          <span className="text-[14px] font-normal text-lightGray lg:text-[16px]">
            팔로워
          </span>
        </div>

        <div className="absolute left-1/2 top-1 w-px h-[80%] bg-[#353542] "></div>

        <div
          className="flex flex-col items-center gap-[5px] cursor-pointer"
          onClick={() => {
            setModalType("followees");
            setIsModalOpen(true);
          }}
        >
          <span className="text-[18px] font-semibold text-white lg:text-[20px]">
            {user.followeesCount}
          </span>
          <span className="text-[14px] font-normal text-lightGray lg:text-[16px]">
            팔로잉
          </span>
        </div>
      </div>

      <FollowListModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        type={modalType}
        userId={user.id}
        nickname={user.nickname}
      />
    </>
  );
}
