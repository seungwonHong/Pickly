"use client";

import { followUser, unfollowUser } from "../api/getUserFollow";
import BaseButton from "@/components/shared/BaseButton";

interface Props {
  userId: number;
  isFollowing: boolean;
  setIsFollowing: (v: boolean) => void;
  setFollowersCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function FollowButton({
  userId,
  isFollowing,
  setIsFollowing,
  setFollowersCount,
}: Props) {
  const handleFollow = async () => {
    await followUser(userId);
    setIsFollowing(true);
    setFollowersCount((prev) => prev + 1);
  };

  const handleUnfollow = async () => {
    await unfollowUser(userId);
    setIsFollowing(false);
    setFollowersCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <BaseButton
      onClick={isFollowing ? handleUnfollow : handleFollow}
      className={`w-full font-semibold md:h-[55px] lg:h-[65px] lg:text-[18px] h-[50px] ${
        isFollowing ? "bg-[#353542] text-white border border-[#4F4F5A]" : ""
      }`}
    >
      {isFollowing ? "팔로우 취소" : "팔로우"}
    </BaseButton>
  );
}
