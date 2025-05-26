'use client'

interface AppButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function AppButton({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
}: AppButtonProps) {
  const variantStyles = {
    primary: disabled
      ? 'bg-[#353542] text-[#6E6E82] rounded-lg '
      : 'bg-gradient-to-r from-[#5097FA] to-[#5363FF] text-white hover:brightness-110 rounded-lg cursor-pointer',
    secondary: disabled
      ? 'border border-[#6e6e82] bg-[#1c1c22] text-[#6E6E82] rounded-lg'
      : 'inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#5097FA] to-[#5363FF] p-[1.5px] hover:brightness-110 rounded-lg cursor-pointer',
    tertiary: disabled
      ? 'border border-[#6e6e82] bg-[#1c1c22] text-[#6E6E82] rounded-lg'
      : 'border border-[#9fa6b2] p-[1.5px] bg-[#1c1c22] text-[#9fa6b2] hover:brightness-110 rounded-lg cursor-pointer',
  }

  if (variant === 'secondary' && !disabled) {
    return (
      <button
        className={` ${variantStyles[variant]}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div
          className={`${className} flex items-center justify-center rounded-lg bg-[#1c1c22] px-6 py-2`}
        >
          <span className="bg-gradient-to-r from-[#5097FA] to-[#5363FF] bg-clip-text text-transparent font-semibold">
            {children}
          </span>
        </div>
      </button>
    )
  }
  return (
    <button
      className={`${className} ${variantStyles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
