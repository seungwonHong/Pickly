import { User } from "@/features/Profile/types/user";
import defaultProfileImage from "../../../../public/defaultProfileImage.jpeg"; //임시 defaultImage//
import Image from "next/image";
import FollowCounts from "./FollowCounts";
import EditProfileModalClient from "./EditProfileModalClient";
import TypeButton from "@/components/shared/TypeButton";

interface Props {
  user: User;
  isMe?: boolean;
}

export default function ProfileCard({ user, isMe }: Props) {
  return (
    <div className="mb-[60px] px-[20px] py-[30px] w-full h-auto rounded-lg bg-[#252530] md:px-[30px] lg:w-[340px] lg:mb-0 lg:sticky lg:top-[120px]">
      <div className="w-full h-auto flex flex-col items-center gap-[30px] lg:gap-10">
        <div className="relative flex items-center justify-center w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] mb-7">
          <div
            className="absolute w-[220%] h-[220%] rounded-full blur-[70px] opacity-50 z-0
                 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, #91caff 0%, transparent 70%)",
            }}
          />

          <div className="relative w-full h-full rounded-full overflow-hidden z-10">
            {user?.image && user.image !== "https://none" ? (
              <Image src={user.image} alt="유저 이미지" fill />
            ) : (
              <Image src={defaultProfileImage} alt="유저 기본 이미지" fill />
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-[10px] lg:gap-5">
        <span className="text-center text-[20px] font-semibold text-[white] hover:cursor-pointer lg:text-[24px]">
          {user.nickname}
        </span>
        {user.description && (
          <span className="text-[14px] font-normal text-[#6E6E82] lg:text-[16px] mb-7">
            {user.description}
          </span>
        )}
      </div>
      <FollowCounts user={user} />
      <div className="mt-6">
        {isMe ? (
          <div className="w-full flex flex-col gap-[10px] md:gap-[15px] lg:gap-5 ">
            <EditProfileModalClient />

            <TypeButton
              className=" hover:bg-[#BF0C0C] hover:border-none  font-semibold md:h-[55px] lg:h-[65px] lg:text-[18px] h-[50px]"
              type="tertiary"
            >
              로그아웃
            </TypeButton>
          </div>
        ) : (
          <button className="w-full bg-[blue] text-white py-2 rounded-xl font-semibold hover:bg-[indigo]">
            팔로우
          </button>
        )}
      </div>
    </div>
  );
}
