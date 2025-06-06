import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ProductIdStatsBoneProps {
  title: string;
  icon: StaticImageData;
  score: number;
  diffValue?: number;
  unit: string;
}

export default function ProductIdStatsBone({
  title,
  icon,
  score,
  diffValue,
  unit,
}: ProductIdStatsBoneProps) {
  return (
    <div className="lg:w-[300px] md:w-[218px] w-full lg:h-[190px] md:h-[169px] h-[82px] flex justify-center items-center mx-auto border-[1px] rounded-[12px] border-[#353542] bg-[#252530]">
      <div className="lg:w-[152px] md:w-[139px] w-[292px] lg:h-[130px] md:h-[109px] h-[42px] flex justify-between md:items-center items-start flex-col gap-[5px]">
        <div className="flex align-center gap-[10px] md:flex-col flex-row">
          <div className="lg:text-[18px] md:text-[16px] text-[14px] font-medium">
            {title}
          </div>
          <div className="flex gap-[5px] items-center justify-between">
            <Image
              src={icon}
              alt="별 / 하트 / 말풍선 아이콘"
              className="lg:w-[24px] md:w-[20px] w-[19px] lg:h-[24px] md:h-[20px] h-[19px]"
            />
            <div className="lg:text-[24px] md:text-[20px] text-[16px] font-[300] text-[#9FA6B2]">
              {score}
            </div>
          </div>
        </div>
        <div className="lg:text-[13px] text-[12px] font-[300] text-[#9FA6B2] text-center">
          {typeof diffValue === "number" &&
            (() => {
              const roundedDiff = parseFloat(diffValue.toFixed(1));
              return (
                <>
                  같은 카테고리의 제품들보다{" "}
                  <span className="text-[#f1f1f5] font-medium">
                    {Math.abs(roundedDiff)}
                    {unit}
                  </span>{" "}
                  {roundedDiff > 0
                    ? "더 많아요!"
                    : roundedDiff < 0
                    ? "더 적어요!"
                    : "같은 수준이에요!"}
                </>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
