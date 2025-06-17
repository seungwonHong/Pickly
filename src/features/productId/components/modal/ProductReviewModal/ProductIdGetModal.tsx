<<<<<<< HEAD
import useGetProductId from "../../../hooks/useGetProductId";
=======
import { useGetProductId } from "../../../hooks/useGetProductId";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
