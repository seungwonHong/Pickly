"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import closeButton from "@../../../public/closeButton.png";
import revertButton from "@../../../public/RevertButton.png";
import defaultProfileImage from "@../../../public/defaultProfileImage.jpeg";
import addImage from "@../../../public/addImage.svg";
import { uploadProfileImage } from "../api/uploadImage";

const DEFAULT_IMAGE_URL = defaultProfileImage.src;

interface Props {
  onImageSelect: (url: string | null) => void;
  defaultPreview?: string | null;
}

export default function ImageUpload({ onImageSelect, defaultPreview }: Props) {
  const [preview, setPreview] = useState<string>("");
  const [isUpdated, setIsUpdated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(defaultPreview ?? DEFAULT_IMAGE_URL);
  }, [defaultPreview]);

  const handleImageClick = () => inputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadProfileImage(file);
      setPreview(uploadedUrl);
      setIsUpdated(true);
      onImageSelect(uploadedUrl);
    } catch (err) {
      console.error("이미지 업로드 실패", err);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setIsUpdated(false);
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRevert = () => {
    setPreview(DEFAULT_IMAGE_URL);
    setIsUpdated(true);
    onImageSelect(DEFAULT_IMAGE_URL);
  };

  const isImageValid =
    preview !== null && preview !== "" && preview !== "https://none";

  return (
    <div
      className="relative lg:w-[160px] lg:h-[160px] md:w-[135px] md:h-[135px] w-[140px] h-[140px] rounded-[10px] overflow-hidden cursor-pointer bg-[#252530] flex justify-center items-center border-[1px] border-[#353542]"
      onClick={handleImageClick}
    >
      {isImageValid ? (
        <img
          src={preview!}
          alt="업로드된 이미지"
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="lg:w-[34px] lg:h-[34px] w-[25px] h-[25px] flex justify-center items-center">
          <Image
            src={addImage}
            alt="디폴트 이미지"
            width={34}
            height={34}
            className="w-full"
          />
        </div>
      )}

      {isImageValid && (
        <>
          {/* 이미지 제거 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full"
          >
            <Image src={closeButton} alt="이미지 제거" width={18} height={18} />
          </button>

          {/* 디폴트 이미지로 되돌리기 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRevert();
            }}
            className="absolute bottom-2 right-2 p-1 bg-black/60 rounded-full"
          >
            <Image
              src={revertButton}
              alt="기본 이미지로 변경"
              width={20}
              height={20}
            />
          </button>
        </>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
