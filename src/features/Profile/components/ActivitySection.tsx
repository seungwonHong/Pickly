import CategoryChip from "@/components/CategoryChip";
import ActivityCard from "./ActivityCard";
import { User } from "@/features/Profile/types/user";

interface Props {
  user: User;
  isMe?: boolean;
}

export default function ActivitySection({ user }: Props) {
  return (
    <div className="mt-[30px] flex gap-[15px]">
      <ActivityCard
        text={
          <>
            남긴 <br className="md:hidden" />
            별점 평균
          </>
        }
        activityData={user.averageRating}
        icon="/icons/star-icon.png"
      />
      <ActivityCard
        text={
          <>
            <br className="md:hidden" />
            남긴 리뷰
          </>
        }
        activityData={user.reviewCount}
        icon="/icons/bubble-icon.png"
      />
      <div className="w-full  flex bg-[#252530] border border-[#353542] rounded-[8px]  h-[130px]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[12px]">
          <span className="block text-center text-sm font-medium text-[#9FA6B2] lg:text-base">
            관심 <br className="md:hidden" />
            카테고리
          </span>
          <div>
            {user.mostFavoriteCategory ? (
              <CategoryChip category={user.mostFavoriteCategory.name} />
            ) : (
              <div className="text-[17px]  font-medium text-[#9FA6B2] ">
                없음
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
