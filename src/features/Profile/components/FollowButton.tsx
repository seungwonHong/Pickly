/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useAuthentication from "@/features/header/hooks/useAuthentication";
import { followUser, unfollowUser } from "../api/getUserFollow";
import toast from "react-hot-toast";
import BaseButton from "@/components/shared/BaseButton";

export interface Props {
  userId: number;
  isFollowing: boolean;
  setIsFollowing: (v: boolean) => void;
  setFollowersCount: React.Dispatch<React.SetStateAction<number>>;
  router: any;
}

export default function FollowButton({
  userId,
  isFollowing,
  setIsFollowing,
  setFollowersCount,
  router,
}: Props) {
  const { isAuthenticated } = useAuthentication();

  const handleFollow = async () => {
    if (!isAuthenticated) {
      toast.error("로그인 후 이용 가능합니다.");
      router.push("/signin");
      return;
    }
    try {
      await followUser(userId);
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("팔로우에 실패했습니다.");
    }
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
