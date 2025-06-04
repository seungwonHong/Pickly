interface BaseButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
}

export default function BaseButton({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: BaseButtonProps) {
  const backgroundStyle = disabled
    ? "#353542"
    : "linear-gradient(90deg, #5097FA 0%, #527CFD 52%, #5363FF 100%)";
  const textColor = disabled ? "text-[#6E6E82]" : "text-[#F1F1F5]";

  const transformStyle = disabled
    ? ""
    : "hover:scale-105 transition-transform duration-200 ease-in-out";
  return (
    <button
      className={`${className} ${textColor} ${transformStyle} rounded-lg px-6 py-2 hover:brightness-110 cursor-pointer `}
      style={{
        background: backgroundStyle,
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
