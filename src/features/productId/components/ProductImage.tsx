"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

export default function ProductImage({
  src,
  alt,
  className,
  onClick,
  priority = false,
  loading = "lazy",
}: ProductImageProps) {
  if (!src || src === "https://none") {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <div className="text-xs text-gray-400">이미지를 불러올 수 없습니다</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt || "상품 이미지"}
        onClick={onClick}
        priority={priority}
        loading={loading}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
