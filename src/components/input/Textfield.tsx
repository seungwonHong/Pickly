

type TextboxSize = 'S' | 'M' | 'L';

interface TextfieldProps {
  size?: TextboxSize;
  width?: number;
  placeholder?: string;
  error?: boolean;
  className?: string;
  [key: string]: any;
}

export function Textfield ({
  size='L', 
  width, 
  placeholder, 
  className, 
  error, 
  ...rest
}:TextfieldProps) {

  const isActive = 'focus-within:bg-gradient-to-r hover:bg-gradient-to-r from-[#5097fa] to-[#5363ff]' 

  const large = 'h-[70px] text-[16px]'
  const medium = 'h-[60px] text-[16px]'
  const small = 'h-[55px] text-[14px]'
  const sizeStyle = size === 'L' ? large : size === 'M' ? medium : small;
  const isError = error ? '!bg-[var(--color-red)] ' : isActive;

  return(
    <>      
      <div 
        className={`relative rounded-[8px] p-[1px] bg-[#353542] ${isError} ${className}`}
        style={{ width: width ? `${width}px` : '100%' }}
      > 
        <input 
          className={`w-full outline-0 rounded-[8px] bg-[#252530] px-[20px] placeholder-[var(--color-deepGray)] text-[var(--color-white)] ${sizeStyle}`}
          placeholder={placeholder}  
          {...rest}
        />
      </div>
    </>
  )
}