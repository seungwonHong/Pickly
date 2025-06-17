"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export default function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  onClick,
}: ProductImageProps) {
  return (
    <div className="flex justify-center items-center overflow-hidden bg-[#1C1C22]">
      <Image
        src={src}
        alt={alt || "상품 이미지"}
        width={width}
        height={height}
        onClick={onClick}
        className={`object-contain ${className}`}
      />
    </div>
  );
}
