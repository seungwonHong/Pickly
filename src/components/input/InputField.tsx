import Image from "next/image";
import { Textfield } from "./Textfield";


const eyeOpen = '/icons/eye_open.svg';
const eyeClose = '/icons/eye_close.svg';

type TextboxSize = 'S' | 'M' | 'L';

interface InputFieldProps {
  size?: TextboxSize;
  width?: number;
  placeholder?: string;
  error?: string;
  className?: string;
  subText?:string;
  [key: string]: any;
}

export function InputField({
  size='L', 
  id,
  width, 
  label, 
  placeholder, 
  className, 
  subText, 
  withEyeToggle,
  eyeState,
  onEyeToggle,
  error, 
  ...rest
}:InputFieldProps){

  const hasError = !!error;
  const message = error || subText;

  return(
    <div className={`${className}`}>
      <div className="relative">

        {/* input 박스 */}
        <label className="text-[var(--color-white)]">{label}</label>
        <Textfield 
          className="mt-2.5"
          id={id}
          size={size}
          placeholder={placeholder}
          error={hasError}
          {...rest}
        />

        {/* 토글아이콘 */}
        {withEyeToggle && (
          <button type="button" onClick={onEyeToggle}
            className='absolute right-6 top-1/2 -translateY-1/2 cursor-pointer'
            aria-label="비밀번호 표시 전환"
          >
            <Image
              src={eyeState ? eyeOpen : eyeClose}
              alt={eyeState ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
          </button>
        )}

      </div>

      {/* 서브텍스트 또는 오류메세지 */}
      {message && (
        <p className={`text-sm mt-[10px] ${error ? 'text-[var(--color-red)]' : 'text-[var(--color-deepGray)]'}`}>
          {message}
        </p>
      )}
    </div>
  )
}