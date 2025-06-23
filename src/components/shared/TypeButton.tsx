interface TypeButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "secondary" | "tertiary";
}

export default function TypeButton({
  children,
  onClick,
  className = "",
  type = "secondary",
}: TypeButtonProps) {
  const isSecondary = type === "secondary";

  // secondaryGradient 스타일 적용
  const secondaryGradient = isSecondary
    ? "linear-gradient(to right, #5097FA, #5363FF)"
    : "";

  // 핵심적으로 다른 부분
  const typeStateColor = isSecondary
    ? "bg-[#1c1c22]"
    : "border border-[#a1a1aa]";

  // span 쪽 다르게 적용
  const spanGradient = isSecondary
    ? "bg-gradient-to-r from-[#5097FA] to-[#5363FF] bg-clip-text text-transparent" // 스타일로 지정하지 않은 이유는 style은 인라인 스타일이기 때문에 Tailwind보다 우선순위가 높아서 bg-clip-text text-transparent 덮어짐
    : "text-[#9FA6B2]";

  return (
    <button
      onClick={onClick}
      className={`rounded-lg cursor-pointer transition-transform duration-200 ease-in-out hover:brightness-110 `}
    >
      <div
        className="rounded-lg p-[1.5px]"
        style={{ background: secondaryGradient }}
      >
        <div
          className={`${className} flex items-center justify-center rounded-lg ${typeStateColor}`}
        >
          <span className={`font-semibold ${spanGradient}`}>{children}</span>
        </div>
      </div>
    </button>
  );
}
