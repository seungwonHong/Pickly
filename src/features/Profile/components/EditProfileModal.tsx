/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import defaultProfileImage from "../../../../public/defaultProfileImage.jpeg";
import closeButton from "@../../../public/closeButton.png";
import BaseButton from "@/components/shared/BaseButton";
import ImageUpload from "./ImageUpload";
import { updateMyProfile } from "../api/updateMyProfile";
import { getMyProfile } from "../api/getMyProfile";
import { uploadProfileImage } from "../api/uploadImage";
import ModalPortal from "./ModalPortal";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_IMAGE_URL = defaultProfileImage.src;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string>(DEFAULT_IMAGE_URL);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      try {
        const user = await getMyProfile();
        if (!user) return null;
        setNickname(user.nickname ?? "");
        setDescription(user.description ?? "");

        if (user.image === "https://none" || !user.image) {
          setPreview(DEFAULT_IMAGE_URL);
        } else {
          setPreview(user.image);
        }
      } catch (err) {
        console.error("프로필 조회 실패", err);
      }
    };

    fetchProfile();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    try {
      setIsPending(true);

      let imageUrl = preview;
      if (selectedFile) {
        imageUrl = await uploadProfileImage(selectedFile);
      }

      const isValidImage = /^https?:\/\/.+/.test(imageUrl ?? "");
      await updateMyProfile({
        nickname,
        description,
        image: isValidImage ? imageUrl : "https://none",
      });

      router.refresh();
      onClose();
      toast.success("프로필이 성공적으로 저장되었습니다!");
    } catch (err) {
      toast.error("프로필편집에 실패했어요.");
      console.error("프로필 업데이트 실패", err);
    } finally {
      setIsPending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalPortal>
        <motion.div className="fixed inset-0 bg-[#000000]/50 z-[1000] flex items-center justify-center overflow-hidden">
          <motion.div
            className="bg-[#1C1C22] rounded-xl w-[335px] h-[550px] md:w-[590px] md:h-[640px] lg:w-[620px] lg:h-[704px] relative pl-[20px] md:pl-[40px] pt-[40px] md:pt-[60px] pr-[18px] pb-[6px] md:pb-[40px]"
            ref={modalRef}
          >
            <Image
              src={closeButton}
              className="absolute w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 top-[15px] right-[15px] md:top-5 md:right-5 cursor-pointer"
              onClick={onClose}
              alt="모달닫기 버튼"
            />

            <motion.div className="text-white text-[20px] lg:text-[24px] font-semibold leading-[28px] mb-[20px] md:mb-[40px]">
              프로필 편집
            </motion.div>

            <ImageUpload
              defaultPreview={preview ?? DEFAULT_IMAGE_URL}
              onImageSelect={(url) => {
                if (url) {
                  setPreview(url);
                } else {
                  setPreview(DEFAULT_IMAGE_URL);
                }
              }}
            />

            <motion.div className="w-[295px] h-[55px] md:w-[510px] md:h-[60px] lg:w-[540px] rounded-[8px] bg-[#252530] border border-[#353542] my-[12px] focus-within:border-[#3B82F6] flex pl-[20px]">
              <input
                value={nickname}
                onChange={(e) => {
                  const value = e.target.value;
                  setNickname(value);
                  if (value.length > 10) {
                    setNicknameError("닉네임은 10자 이하로 입력해주세요.");
                  } else {
                    setNicknameError(null);
                  }
                }}
                className="w-full focus:outline-none placeholder-[var(--color-deepGray)] font-normal text-white"
                placeholder="닉네임을 입력해주세요"
              />
            </motion.div>
            {nicknameError && (
              <p className="text-[12px] md:text-[12px] lg:text-[14px] text-[var(--color-red)] mb-[10px] ">
                {nicknameError}
              </p>
            )}

            <motion.div
              className={`
    w-[295px] h-[120px] md:w-[510px] md:h-[160px] lg:w-[540px] 
    relative p-[1px] bg-[#353542] rounded-[8px] mb-[20px]
    ${
      description.length >= 300
        ? "border border-[var(--color-red)]"
        : "focus-within:border-[#3B82F6]"
    }
  `}
            >
              <textarea
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 300) {
                    setDescription(value);
                  }
                }}
                placeholder="프로필 소개를 입력해주세요"
                className="w-full h-full  outline-0 resize-none overflow-y-auto break-words rounded-[8px] bg-[#252530] p-[20px] placeholder-[var(--color-deepGray)] text-[var(--color-white)]"
              />
              <span className="absolute bottom-[20px] right-[20px] text-sm text-[var(--color-deepGray)]">
                {description.length}/300
              </span>
            </motion.div>

            <BaseButton
              className="w-[295px] md:w-[510px] lg:w-[540px] h-[50px] md:h-[55px] lg:h-[65px] text-[16px] lg:text-[18px]"
              onClick={handleSubmit}
              disabled={isPending}
            >
              저장하기
            </BaseButton>
          </motion.div>
        </motion.div>
      </ModalPortal>
    </AnimatePresence>
  );
}
