import { useUserStore } from "../../libs/useUserStore";

interface TypeButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  productId?: number;
}

export default function ModalProductName({
  children,
  onClick,
  className = "",
  productId,
}: TypeButtonProps) {
  const selectedCompareId = useUserStore(
    (state) => state.selectedCompareProductId
  );
  const setSelectedCompareId = useUserStore(
    (state) => state.setSelectedCompareProductId
  );

  const setBaseCompareProductId = useUserStore(
    (state) => state.setBaseCompareProductId
  );

  const isSelected = selectedCompareId === productId;

  return (
    <button
      onClick={() => {
        if (productId) {
          setSelectedCompareId(productId);
          setBaseCompareProductId(productId);
        }
        onClick?.();
      }}
      className="rounded-lg cursor-pointer transition duration-300 ease-in-out"
    >
      <div>
        <div
          className={`${className} flex items-center justify-center border rounded-lg 
            w-[420px] h-[65px] font-semibold text-[18px] transition-colors duration-300 ease-in-out 
            ${
              isSelected
                ? "border-[#FF2F9F] text-[#FF2F9F]"
                : "border-[#a1a1aa] text-[#9FA6B2] hover:border-[#FF2F9F] hover:text-[#FF2F9F]"
            }`}
        >
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
}
