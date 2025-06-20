import Header from "@/components/shared/Header";
import { getMyProfile } from "@/features/Profile/api/getMyProfile";
import { getUserProducts } from "@/features/Profile/api/getUserProducts";
import ActivitySection from "@/features/Profile/components/ActivitySection";
import ProductTabSection from "@/features/Profile/components/ProductTabSection";

import ProfileCard from "@/features/Profile/components/ProfileCard";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const user = await getMyProfile();

  if (!user) {
    redirect("/signin");
  }
  const initialProducts = await getUserProducts(user.id, "reviewed");
  // console.log(user);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </header>
      <div
        className="mt-[40px] px-[30px] height:100vh md:px-[117px] lg:mx-auto lg:px-[20px] 
      lg:flex lg:justify-center lg:gap-[70px] max-w-[1380px] "
      >
        <div className="h-auto">
          <ProfileCard user={user} isMe={true} />
        </div>
        <div className="w-full flex flex-col mb-[60px]">
          <span className="text-[#F1F1F5] font-semibold text-[18px] lg:text-[20px]">
            활동 내역
          </span>
          <ActivitySection user={user} />
          <ProductTabSection
            userId={user.id}
            initialTab="reviewed"
            initialProducts={initialProducts}
          />
        </div>
      </div>
    </>
  );
}
