import BaseButton from '@/components/shared/BaseButton'
import TypeButton from '@/components/shared/TypeButton'

export default function TestPage() {
  const isState = true
  return (
    <div className="bg-[#1c1c22] w-full h-full flex flex-col items-center justify-center gap-4 ">
      <BaseButton disabled={isState} className="py-[22px] px-[288.5px]">
        가입하기
      </BaseButton>
      <BaseButton disabled={!isState} className="py-[22px] px-[288.5px]">
        가입하기
      </BaseButton>
      <TypeButton className="py-[12px] px-[188.5px]">가입하기</TypeButton>
      <TypeButton type="tertiary" className="py-[12px] px-[188.5px]">
        가입하기
      </TypeButton>
    </div>
  )
}
