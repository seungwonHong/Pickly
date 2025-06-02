"use client";

import { useUserProducts, ProductTabType } from "./useUserProducts";
import UserProductCard from "./UserProductCard";

interface ProductGridProps {
  userId: number;
  type: ProductTabType;
}

export default function ProductGrid({ userId, type }: ProductGridProps) {
  const { products, isLoading, isError, isFetchingNextPage, hasNextPage, ref } =
    useUserProducts({ userId, type });

  if (isLoading) return <p className="text-gray-400">불러오는 중...</p>;
  if (isError) return <p className="text-red-500">에러가 발생했습니다.</p>;

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
      </div>

      {/* 무한 스크롤용 */}
      <div ref={ref} className="h-10" />

      {isFetchingNextPage && (
        <p className="text-center text-gray-500 mt-4">불러오는 중...</p>
      )}
      {!hasNextPage && products.length > 0 && (
        <p className="text-center text-gray-400 mt-4">
          모든 상품을 불러왔습니다.
        </p>
      )}
    </>
  );
}
