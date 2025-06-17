import React, { useEffect, useState } from "react";
import ComparisonResult from "./ComparisonResult";
import { productService } from "../api/api";

type ProductStats = {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
};

type Props = {
  productId1: number;
  productId2: number;
};

const ComparisonContainer = ({ productId1, productId2 }: Props) => {
  const [product1Stats, setProduct1Stats] = useState<ProductStats | null>(null);
  const [product2Stats, setProduct2Stats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      productService.getProductsId(productId1),
      productService.getProductsId(productId2),
    ])
      .then(([res1, res2]) => {
        setProduct1Stats({
          rating: res1.data.rating,
          reviewCount: res1.data.reviewCount,
          favoriteCount: res1.data.favoriteCount,
        });
        setProduct2Stats({
          rating: res2.data.rating,
          reviewCount: res2.data.reviewCount,
          favoriteCount: res2.data.favoriteCount,
        });
      })
      .catch((error) => {
        console.error("🚨 상품 정보 불러오기 실패:", error);
      })
      .finally(() => setLoading(false));
  }, [productId1, productId2]);

  if (loading) return <div>로딩 중...</div>;
  if (!product1Stats || !product2Stats) return <div>상품 정보를 불러올 수 없습니다.</div>;

  return (
    <ComparisonResult
      product1Stats={product1Stats}
      product2Stats={product2Stats}
    />
  );
};

export default ComparisonContainer;