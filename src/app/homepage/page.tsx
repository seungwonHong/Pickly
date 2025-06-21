export const dynamic = "force-dynamic";
import FloatingButton from "@/components/shared/FloatingButton";
import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ProductCard from "@/components/shared/ProductCard";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";
import { getProductsFetch } from "@/features/home/services/getProduct";
import HighStarProduct from "@/features/home/components/HighStarProduct";
import MoreProducts from "@/features/home/components/MoreProducts";
import AddEditProductModal from "@/components/shared/AddEditProductModal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const hotProduct = await getProductsFetch({ order: "reviewCount" });
  const starProduct = await getProductsFetch({ order: "rating" });

  const { id } = await params;

  return (
    <div className="relative overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-20">
        <Header />
      </header>

      <div className="relative flex flex-row lg:justify-center 2xl:px-[150px] md:px-0 px-[20px] mt-[100px] lg:mx-auto">
        <div className="fixed 2xl:left-[150px] lg:left-[40px] md:left-0 md:flex hidden">
          <Category categoryId={id} />
        </div>

        <div className="2xl:flex flex-col mt-[60px] hidden lg:mb-[50px] mb-[30px] lg:w-[50vw] md:w-[60vw] w-full max-w-[1000px]">
          <span className="lg:text-[24px] text-[#F1F1F5] font-semibold">
            지금 핫한 상품
            <span className="bg-gradient-to-r from-[#5097fa] to-[#5363ff] bg-clip-text text-transparent">
              TOP 6
            </span>
          </span>

          <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-[20px] lg:mt-[30px]">
            {hotProduct.list.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-[80px]">
            <span className="lg:text-[24px] text-[20px] text-[#F1F1F5] font-semibold">
              별점이 높은 상품
            </span>
            <HighStarProduct products={starProduct} />
            <MoreProducts
              nextCursor={starProduct.nextCursor}
              queryKey={["products", 0, undefined]}
              key={"starProduct"}
              order="recent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:ml-0 md:ml-[180px]">
          <div className="lg:fixed 2xl:right-[150px] lg:right-[40px]">
            <ReviewerRanking />
          </div>

          {/* 데스크톱 사이즈가 아닌 경우 */}
          <div className="2xl:hidden flex flex-col mt-[60px] lg:mb-[50px] mb-[30px] lg:w-[50vw] md:w-[60vw] w-[90vw] max-w-[620px]">
            <span className="text-[20px] text-[#F1F1F5] font-semibold">
              지금 핫한 상품
              <span className="bg-gradient-to-r from-[#5097fa] to-[#5363ff] bg-clip-text text-transparent">
                Top 6
              </span>
            </span>

            <div className="grid grid-cols-2 gap-[15px] items-center justify-center mt-[30px]">
              {hotProduct.list.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-[60px]">
              <span className="lg:text-[24px] text-[20px] text-[#F1F1F5] font-semibold">
                별점이 높은 상품
              </span>
              <HighStarProduct products={starProduct} />
              <MoreProducts
                nextCursor={starProduct.nextCursor}
                queryKey={["products", 0, undefined]}
                key={"starProduct"}
                order="recent"
              />
            </div>
          </div>
        </div>

        <div className="fixed lg:right-[180px] md:right-[30px] right-[20px] lg:bottom-[90px] md:bottom-[90px] bottom-[40px]">
          <FloatingButton />
        </div>
      </div>

      <AddEditProductModal
        buttonPlaceholder="추가하기"
        modalType="addProduct"
        purpose="상품 추가"
      />
    </div>
  );
}
