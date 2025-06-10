"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import addImage from "@../../../public/addImage.svg";
import closeButton from "@../../../public/closeButton.png";

interface Props {
  onImageSelect: (file: File | null) => void;
  defaultPreview?: string;
}

export default function ImageUpload({ onImageSelect, defaultPreview }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultPreview || null);
  const [isUpdated, setIsUpdated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUpdated(true);
    onImageSelect(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onReset = () => {
    setPreview(null);
    setIsUpdated(false);
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className="relative lg:w-[160px] lg:h-[160px] md:w-[135px] md:h-[135px] w-[140px] h-[140px] rounded-[10px] overflow-hidden cursor-pointer bg-[#252530] flex justify-center items-center border-[1px] border-[#353542]"
      onClick={handleImageClick}
    >
      {preview && preview !== "https://none" ? (
        <Image
          src={preview}
          alt="업로드된 이미지"
          fill
          className="object-cover"
        />
      ) : (
        <div className="lg:w-[34px] lg:h-[34px] w-[24px] h-[24px] ">
          <Image
            src={addImage}
            alt="이미지 업로드"
            width={34}
            height={34}
            className="w-full"
          />
        </div>
      )}

      {isUpdated && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 업로드창 열림 방지
            onReset();
          }}
          className="absolute top-2 right-2 p-1 bg-black/60 rounded-full"
        >
          <Image src={closeButton} alt="이미지 제거" width={20} height={20} />
        </button>
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
