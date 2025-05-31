"use client";
import React from "react";
import { useState } from "react";

export default function ProductReviewStarModal({
  onChange,
}: {
  onChange?: (rating: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = isHalf ? index - 0.5 : index;
    setRating(newRating);
    onChange?.(newRating);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    setHover(isHalf ? index - 0.5 : index);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const getFill = (index: number) => {
    const value = hover ?? rating;
    if (value >= index) return "full";
    if (value >= index - 0.5) return "half";
    return "empty";
  };

  return (
    <div className="flex gap-[20px]">
      <div className="text-[16px] font-medium flex items-center">별점</div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((index) => {
          const fill = getFill(index);
          return (
            <div
              key={index}
              onClick={(e) => {
                const { left, width } = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - left;
                const isHalf = x < width / 2;
                handleClick(index, isHalf);
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="relative w-8 h-8 cursor-pointer"
            >
              {/* 회색 배경 별 */}
              <img
                src="/icons/star.svg"
                alt="빈 별"
                className="w-full h-full absolute top-0 left-0"
                style={{ filter: "grayscale(100%)" }}
              />

              {/* 노란색 별 */}
              {fill !== "empty" && (
                <img
                  src="/icons/star.svg"
                  alt="채워진 별"
                  className="w-full h-full absolute top-0 left-0"
                  style={{
                    filter: "brightness(1.2)",
                    clipPath: fill === "half" ? "inset(0 50% 0 0)" : "none",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
