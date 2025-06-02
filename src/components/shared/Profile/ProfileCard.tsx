import { User } from "@/types/user";
import defaultProfileImage from "../../../../public/defaultProfileImage.jpeg"; //임시 defaultImage//
import Image from "next/image";
import { useState } from "react";
import FollowListModal from "./FollowListModal";

interface Props {
  user: User;
  isMe?: boolean;
}

export default function ProfileCard({ user, isMe }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "followees" | null>(
    null
  );
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
      {modalType && (
        <FollowListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
          userId={user.id}
          nickname={user.nickname}
        />
      )}

      <div className="mt-6">
        {isMe ? (
          <div className="w-full flex flex-col gap-[10px] md:gap-[15px] lg:gap-5">
            <button
              className="w-full h-[50px] flex justify-center items-center rounded-lg bg-[#5097fa] text-white text-[16px] font-semibold hover:cursor-pointer
            md:h-[55px] lg:h-[65px] lg:text-[18px]"
            >
              프로필 편집
            </button>
            <button
              className="w-full h-[50px] flex justify-center items-center rounded-lg border border-[#9FA6B2] text-[#9FA6B2] text-[16px] font-semibold hover:cursor-pointer
            md:h-[55px] lg:h-[65px] lg:text-[18px]"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button className="w-full bg-[blue] text-white py-2 rounded-xl font-semibold hover:bg-[indigo]">
            팔로우
          </button>
        )}
      </div>
      {modalType && (
        <FollowListModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setModalType(null);
          }}
          type={modalType}
          userId={user.id}
          nickname={user.nickname}
        />
      )}
    </div>
  );
}
