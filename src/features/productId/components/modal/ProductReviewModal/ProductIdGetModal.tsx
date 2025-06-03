import useGetProductId from "../../../hooks/useGetProductId";
import CategoryChip from "@/components/CategoryChip";
export default function ProductIdGetModal() {
  const { product } = useGetProductId();

  if (!product) return null;

  return (
    <div className="flex flex-col gap-[10px]">
      <CategoryChip
        category={product.category.name}
        className="text-[12px] w-fit"
      />
      <div className="font-semibold text-[24px]">{product.name}</div>
    </div>
  );
}
