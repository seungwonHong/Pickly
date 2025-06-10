"use client";
import useModalStore from "@/features/home/modals/store/modalStore";

interface TextboxProps {
  placeholder?: string;
  error?: string;
  subText?: string;
  className?: string;
  maxLength?: number;
  [key: string]: any;
}

export function Textbox({
  placeholder,
  className,
  error,
  subText,
  maxLength,
  ...rest
}: TextboxProps) {
  const { description, setDescription } = useModalStore();
  const noSpaceCount = description?.replace(/\s/g, "").length; // 공백제외하고 카운트

  const message = error || subText;

  const isActive = "focus-within:bg-gradient-to-r from-[#5097fa] to-[#5363ff]";

  const isError = error ? "!bg-[var(--color-red)] " : isActive;

  return (
    <>
      <div
        className={`relative rounded-[8px] p-[1px] h-[120px] bg-[#353542] ${isError}  ${className}`}
      >
        <textarea
          className={`
            w-full h-full outline-0 resize-none overflow-y-auto break-words 
            rounded-[8px] bg-[#252530] p-[20px] 
            placeholder-[var(--color-deepGray)] text-[var(--color-white)] 
            `}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={placeholder}
          {...rest}
        />
        <span className="absolute bottom-[20px] right-[20px] text-sm text-[var(--color-deepGray)]">
          {noSpaceCount}/{maxLength}
        </span>
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
