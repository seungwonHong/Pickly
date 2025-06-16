const VALID_CATEGORIES = [
  "음악",
  "영화/드라마",
  "강의/책",
  "호텔",
  "가구/인테리어",
  "식당",
  "전자기기",
  "화장품",
  "의류/악세서리",
  "앱",
] as const;

type ValidCategory = (typeof VALID_CATEGORIES)[number];

const isValidCategory = (value: string): value is ValidCategory => {
  return VALID_CATEGORIES.includes(value as ValidCategory);
};

export interface CategoryChipProps {
  category: string;
  className?: string;
}

const categoryColors: Record<ValidCategory, string> = {
  음악: "bg-[#C5D17C1A] text-[#C5D17C]",
  "영화/드라마": "bg-[#F755321A] text-[#F75532]",
  "강의/책": "bg-[#A953FF1A] text-[#A953FF]",
  호텔: "bg-[#49AF1A1A] text-[#49AF1A]",
  "가구/인테리어": "bg-[#D676C11A] text-[#FF7E46]",
  식당: "bg-[#FF7E461A] text-[#F75532]",
  전자기기: "bg-[#23B5811A] text-[#23B581]",
  화장품: "bg-[#FD529A1A] text-[#FD529A]",
  "의류/악세서리": "bg-[#757AFF1A] text-[#757AFF]",
  앱: "bg-[#3098E31A] text-[#3098E3]",
};

export default function CategoryChip({
  category,
  className,
}: CategoryChipProps) {
  if (!isValidCategory(category)) {
    return null;
  }

  const chipStyle = categoryColors[category];

  return (
    <div
      className={`inline-flex justify-center items-center rounded-md font-normal  px-[8px] py-[4px] h-[22px] lg:rounded-lg lg:font-medium  lg:h-[29px] ${chipStyle} ${className}`}
    >
      {category}
    </div>
  );
}
