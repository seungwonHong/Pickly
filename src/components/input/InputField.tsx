import Image from "next/image";
import { useState } from "react";

const eyeOpen = "/icons/eye_open.svg";
const eyeClose = "/icons/eye_close.svg";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  className?: string;
  subText?: string;
  withEyeToggle?: boolean;
  eyeState?: boolean;
  onEyeToggle?: () => void;
  error?: string;
  [key: string]: any;
}

export function InputField({
  id,
  label,
  placeholder,
  className,
  subText,
  withEyeToggle,
  error,
  ...rest
}: InputFieldProps) {
  const [passwordBoxType, setPasswordBoxType] = useState(true);

  const hasError = !!error;
  const message = error || subText;
  const isActive = 'focus-within:bg-gradient-to-r from-[#5097fa] to-[#5363ff]' 

  const isError = hasError ? "!bg-[var(--color-red)] " : isActive;

  const handleEyeClick = () => {
    setPasswordBoxType((prev) => !prev);
  };

  return (
    <>
      {/* input 박스 */}
      {label && <label className="block mb-[10px] text-[var(--color-white)] text-[14px] md:text-[16px]">{label}</label>}
      <div 
        className={`relative rounded-[8px] p-[1px] bg-[#353542] ${isError} ${className}`}
      > 
        <input 
          className={`w-full h-full outline-0 border-0 rounded-[8px] bg-[#252530] px-[20px] placeholder-[var(--color-deepGray)] text-[var(--color-white)] `}
          placeholder={placeholder}
          type={passwordBoxType ? "password" : "text"}
          {...rest}
        />

        {/* 토글아이콘 */}
        {withEyeToggle && (
          <button
            type="button"
            onClick={handleEyeClick}
            className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label="비밀번호 표시 전환"
          >
            <Image
              src={passwordBoxType ? eyeClose : eyeOpen}
              alt={passwordBoxType ? "비밀번호 보기" : "비밀번호 숨기기"}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {/* 서브텍스트 또는 오류메세지 */}
      {message && (
        <p
          className={`text-sm mt-[10px] ${
            error ? "text-[var(--color-red)]" : "text-[var(--color-deepGray)]"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
}
