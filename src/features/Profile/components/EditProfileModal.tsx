"use client";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import closeButton from "@../../../public/closeButton.png";
import BaseButton from "@/components/shared/BaseButton";
import ImageUpload from "./ImageUpload";
import { updateMyProfile } from "../api/updateMyProfile";
import { getMyProfile } from "../api/getMyProfile";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      try {
        const user = await getMyProfile();
        setNickname(user.nickname ?? "");
        setDescription(user.description ?? "");
        setPreview(user.image ?? null);
      } catch (err) {
        console.error("프로필 조회 실패", err);
      }
    };

    fetchProfile();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // 프로필 수정
  const handleSubmit = async () => {
    try {
      setIsPending(true);
      const isValidImage = /^https?:\/\/.+/.test(preview ?? "");
      await updateMyProfile({
        nickname,
        description,
        image: isValidImage ? preview : "https://none",
      });
      console.log("전송 데이터", {
        nickname,
        description,
        image: preview,
      });
      router.refresh();
      onClose();
    } catch (err) {
      console.error("프로필 업데이트 실패", err);
    } finally {
      setIsPending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000]/50 z-[100] flex items-center justify-center overflow-hidden">
      <div
        className=" bg-[#1C1C22]  rounded-xl  w-[335px] h-[513px] md:w-[590px] md:h-[640px] lg:w-[620px] lg:h-[704px] relative pl-[20px] md:pl-[40px] pt-[40px] md:pt-[60px] pr-[18px] pb-[6px] md:pb-[40px] "
        ref={modalRef}
      >
        <Image
          src={closeButton}
          className="absolute w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 top-[15px] right-[15px] md:top-5 md:right-5 cursor-pointer"
          onClick={onClose}
          alt="모달닫기 버튼"
        />

        <div className="text-white text-[20px] lg:text-[24px] font-semibold leading-[28px]  mb-[20px] md:mb-[40px] ">
          프로필 편집
        </div>

        {/* 프로필 이미지 */}

        <ImageUpload
          defaultPreview={preview ?? "https://none"}
          onImageSelect={(file) => {
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setPreview(reader.result as string);
              reader.readAsDataURL(file);
            } else {
              setPreview(null);
            }
          }}
        />

        {/* 입력 폼 */}
        <div className="w-[295px] h-[55px] md:w-[510px] md:h-[60px] md:my-[15px] lg:my-[20px] lg:w-[540px] lg:h-[70px]  rounded-[8px] bg-[#252530] border-[1px] border-[#353542] my-[12px]   focus-within:border-[#3B82F6] flex pl-[20px]">
          <input
            onChange={(e) => setNickname(e.target.value)}
            className="w-[100%] focus:outline-none placeholder-[var(--color-deepGray)]  font-normal text-white "
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div className=" w-[295px] h-[120px] md:w-[510px] md:h-[160px] lg:w-[540px]  relative  p-[1px]  bg-[#353542] rounded-[8px]  mb-[20px] md:mb-[20px] lg:mb-[20px] focus-within:border-[#3B82F6]">
          <textarea
            className={`
            w-full h-full outline-0 resize-none overflow-y-auto break-words 
            rounded-[8px] bg-[#252530] p-[20px] 
            placeholder-[var(--color-deepGray)] text-[var(--color-white)] 
            `}
            onChange={(e) => {
              setHasTyped(true);
              setDescription(e.target.value);
            }}
            placeholder="프로필 소개를 입력해주세요"
          />
          <span className="absolute bottom-[20px] right-[20px] text-sm text-[var(--color-deepGray)]">
            {hasTyped ? description.length : 0}/500
          </span>
        </div>

        <BaseButton
          className="w-[295px]  md:w-[510px]  lg:w-[540px] h-[50px]  md:h-[55px] lg:h-[65px]    text-[16px] lg:text-[18px] "
          onClick={handleSubmit}
          disabled={isPending}
        >
          저장하기
        </BaseButton>
      </div>
    </div>
  );
}
