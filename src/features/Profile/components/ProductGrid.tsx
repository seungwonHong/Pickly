import { useUserProducts } from "../hook/useUserProducts";
import { Product, ProductTabType } from "../types/user";
import { ProductList } from "@/features/home/types/productType";
import ProductCard from "@/components/shared/ProductCard";
import logo from "../../../../public/icons/logo.png";
import Image from "next/image";
interface Props {
  userId: number;
  type: ProductTabType;
  initialProducts?: Product[];
}

export default function ProductGrid({ userId, type, initialProducts }: Props) {
  const { products, ref } = useUserProducts({
    userId,
    type,
    initialData: initialProducts,
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:w-full lg:max-w-[1000px] w-full md:max-w-[620px] sm:max-w-[620px] ">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={
              {
                id: product.id,
                name: product.name,
                image: product.image,
                categoryId: product.categoryId ?? 0,
                reviewCount: product.reviewCount,
                favoriteCount: product.favoriteCount,
                rating: product.rating,
                writerId: 0,
                createdAt: "",
                updatedAt: "",
              } as ProductList
            }
          />
        ))
      ) : (
        <div className="col-span-2 md:col-span-3 text-center text-gray-400 pt-[60px] lg:pt-[100px] flex justify-center gap-2 ">
          <>상품이 없습니다</>
          <Image src={logo} alt="로고" width={25} height={5} />
        </div>
      )}
      <div ref={ref} />
    </div>
  );
}
