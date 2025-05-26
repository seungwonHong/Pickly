import AppButton from '@/components/shared/AppButton'

export default function TestPage() {
  const isState = true
  return (
    <div className="bg-[#1c1c22] w-full h-full flex flex-col items-center justify-center gap-4 ">
      <AppButton
        variant="primary"
        disabled={isState}
        className="py-[22px] px-[288.5px]"
      >
        로그인
      </AppButton>
      <AppButton
        variant="primary"
        disabled={!isState}
        className="py-[22px] px-[288.5px]"
      >
        로그인
      </AppButton>
      <AppButton variant="secondary" className="py-[18px] px-[192px]">
        로그인
      </AppButton>
      <AppButton variant="secondary" disabled className="py-[18px] px-[192px]">
        로그인
      </AppButton>
      <AppButton variant="tertiary" className="py-[15px] px-[139px]">
        로그인
      </AppButton>
      <AppButton variant="tertiary" disabled className="py-[15px] px-[139px]">
        로그인
      </AppButton>
      <AppButton variant="tertiary" disabled className="py-[15px] px-[139px]">
        마음대로 쓰세용용
      </AppButton>
    </div>
  )
}
