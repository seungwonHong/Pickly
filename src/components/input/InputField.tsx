import { Textfield } from "./Textfield";



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
  width, 
  label, 
  placeholder, 
  className, 
  subText, 
  error, 
  ...rest
}:InputFieldProps){

  const hasError = !!error;
  const message = error || subText;

  return(
    <div className={`${className}`}>
      <label>{label}</label>
      <Textfield 
        size={size}
        placeholder={placeholder}
        error={hasError}
        {...rest}
      />
      {message && (
        <p className={`text-sm mt-[10px] ${error ? 'text-[var(--color-red)]' : 'text-[var(--color-deepGray)]'}`}>
          {message}
        </p>
      )}
    </div>
  )
}