import { useState } from "react";

type TextboxSize = 'S' | 'M' | 'L';

interface TextboxProps {
  size?: TextboxSize;
  width?: number;
  placeholder?: string;
  error?: string;
  subText?: string;
  className?: string;
  maxLength?: number;
  [key: string]: any;
}

export function Textbox({
  size='L', 
  width, 
  placeholder, 
  className, 
  error, 
  subText, 
  maxLength, 
  ...rest
}:TextboxProps){

  const [text, setText] = useState('');
  const noSpaceCount = text.replace(/\s/g, '').length;  // 공백제외하고 카운트

  const message = error || subText;
  const isActive = 'focus-within:bg-gradient-to-r hover:bg-gradient-to-r from-[#5097fa] to-[#5363ff]' 

  const large = 'h-[128px] text-[16px] '
  const medium = 'h-[120px] text-[14px]'
  const small = 'h-[120px] text-[14px]'

  const sizeStyle = size === 'L' ? large : size === 'M' ? medium : small;
  const isError = error ? '!bg-[var(--color-red)] ' : isActive;

  return(
    <>
      <div 
        className={`relative rounded-[8px] text-[0px] p-[1px] bg-[#353542] ${isError}  ${className}`}
        style={{ width: width ? `${width}px` : '100%' }}
      > 
        <textarea
          className={`
            w-full outline-0 resize-none overflow-y-auto break-words 
            rounded-[8px] bg-[#252530] p-[20px] 
            placeholder-[var(--color-deepGray)] text-[var(--color-white)] 
             ${sizeStyle}
            `}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}  
          {...rest}
        />
        <span className="absolute bottom-[20px] right-[20px] text-sm text-[var(--color-deepGray)]">
          {noSpaceCount}/{maxLength}
        </span>
      </div>
      {/* 서브텍스트 또는 오류메세지 */}
      {message && (
        <p className={`text-sm mt-[10px] ${error ? 'text-[var(--color-red)]' : 'text-[var(--color-deepGray)]'}`}>
          {message}
        </p>
      )}
    </>
  )
}