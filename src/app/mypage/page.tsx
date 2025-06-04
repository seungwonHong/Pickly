"use client";
import Header from "@/components/shared/Header";
import ActivitySection from "@/components/shared/Profile/ActivitySection";
import ProductTabSection from "@/components/shared/Profile/ProductTabSection";
import ProfileCard from "@/components/shared/Profile/ProfileCard";
import { useMyProfile } from "@/components/shared/Profile/useMyProfile";

const MyPagePage = () => {
  const { data: user, isLoading, isError } = useMyProfile();
  // console.log(user);
  if (isLoading) {
    return <p className="text-gray-400">로딩 중...</p>;
  }

  if (isError || !user) {
    return <p className="text-red-400">유저 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <>
      <Header />
      <div className="mt-[40px] px-[20px] min-h-screen md:px-[117px] lg:mx-auto lg:px-0 lg:flex lg:justify-center lg:gap-[70px] max-w-[1340px] ">
        <div className="h-auto">
          <ProfileCard user={user} isMe={true} />
        </div>
        <div className="w-full flex flex-col mb-[60px]">
          <span className="text-[#F1F1F5] font-semibold text-[18px] lg:text-[20px]">
            활동 내역
          </span>
          <ActivitySection user={user} />
          <ProductTabSection userId={user.id} />
        </div>
      </div>
    </>
  );
};

export default MyPagePage;
