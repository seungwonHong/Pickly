"use client";
import toast from "react-hot-toast";

interface TextboxReviewProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  subText?: string;
  className?: string;
  maxLength?: number;
  showCharCount?: boolean; // 글자수 표시 여부
}

export function TextboxReview({
  value,
  onChange,
  placeholder,
  className,
  error,
  subText,
  maxLength = 500,
  showCharCount = true,
}: TextboxReviewProps) {
  const noSpaceCount = value?.replace(/\s/g, "").length;
  const message = error || subText;

  const isActive = "focus-within:bg-gradient-to-r from-[#5097fa] to-[#5363ff]";
  const isError = error ? "!bg-[var(--color-red)] " : isActive;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const disallowedPattern = /[~`@#$%^&*()+={}\[\]:;"'<>/\\|_-]/;
    if (!disallowedPattern.test(val)) {
      if (val.length <= maxLength) {
        onChange(e);
      } else {
        toast.error(`${maxLength}자 이내로 입력해주세요.`);
      }
    }
  };

  return (
    <>
      <div
        className={`relative rounded-[8px] p-[1px] h-[120px] bg-[#353542] ${isError} ${className}`}
      >
        <textarea
          className={`
            w-full h-full outline-0 resize-none overflow-y-auto break-words 
            rounded-[8px] bg-[#252530] p-[20px] 
            placeholder-[var(--color-deepGray)] text-[var(--color-white)] 
          `}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {showCharCount && (
          <span className="absolute bottom-[20px] right-[20px] text-sm text-[var(--color-deepGray)]">
            {noSpaceCount}/{maxLength}
          </span>
        )}
      </div>

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
