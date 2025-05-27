'use client'

interface BaseButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function BaseButton({
  children,
  onClick,
  disabled = false,
  className = '',
}: BaseButtonProps) {
  const backgroundStyle = disabled
    ? '#353542'
    : 'linear-gradient(90deg, #5097FA 0%, #527CFD 52%, #5363FF 100%)'
  const textColor = disabled ? '#6E6E82' : '#F1F1F5'

  return (
    <button
      className={`${className} text-[${textColor}] rounded-lg px-6 py-2 hover:brightness-110 cursor-pointer `}
      style={{
        background: backgroundStyle,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
