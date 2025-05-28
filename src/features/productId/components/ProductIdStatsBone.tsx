import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import Heart from '../../../../public/icons/Heart.png'
import Star from '../../../../public/icons/Star.png'
import Talk from '../../../../public/icons/Talk.png'

interface ProductIdStatsBoneProps {
  title: string
  icon: StaticImageData
  score: number
}

export default function ProductIdStatsBone({
  title,
  icon,
  score,
}: ProductIdStatsBoneProps) {
  return (
    <div className="w-[300px] h-[190px] flex justify-center items-center mx-auto border-[1px] rounded-[12px] border-[#353542] bg-[#252530]">
      <div className="w-[152px] h-[130px]  flex justify-between items-center flex-col">
        <div className="text-[18px] font-medium">{title}</div>
        <div className="flex gap-[5px]">
          <Image
            src={icon}
            alt="별 / 하트 / 말풍선 아이콘"
            width={24}
            height={24}
          />
          <div>{score}</div>
        </div>
        <div className="text-[14px] font-[300]">같은 카테고리 </div>
      </div>
    </div>
  )
}
