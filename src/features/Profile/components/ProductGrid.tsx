import { useUserProducts } from "../hook/useUserProducts";
import { Product, ProductTabType } from "../types/user";
import UserProductCard from "./UserProductCard";

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
<<<<<<< HEAD
=======
  console.log("ProductGrid", products);
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <UserProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              rating={product.rating}
              favoriteCount={product.favoriteCount}
              reviewCount={product.reviewCount}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 text-center text-gray-400 pt-[100px]">
            상품이 없습니다.
          </div>
        )}
        <div ref={ref} />
      </div>
    </>
  );
}
