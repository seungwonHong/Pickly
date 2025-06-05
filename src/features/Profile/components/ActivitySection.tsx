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
        text="남긴 리뷰"
        activityData={user.reviewCount}
        icon="/icons/bubble-icon.png"
      />
      <div className="w-full aspect-[9/10] flex bg-[#252530] border border-[#353542] rounded-[8px] md:aspect-[10/7] lg:aspect-[5/3] h-[130px]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[20px]">
          <span className="block text-center text-sm font-medium text-[#9FA6B2] lg:text-base">
            관심 <br className="md:hidden" />
            카테고리
          </span>
          <div>
            {user.mostFavoriteCategory ? (
              <CategoryChip category={user.mostFavoriteCategory.name} />
            ) : (
              <div className="text-[17px]  font-medium text-[#9FA6B2]  p-0.5">
                없음
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
