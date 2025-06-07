import FloatingButton from "@/components/shared/FloatingButton";
import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";
import { getProductsFetch } from "@/features/home/services/getProduct";
import HighStarProduct from "@/features/home/components/HighStarProduct";
import MoreProducts from "@/features/home/components/MoreProducts";
import AddEditProductModal from "@/components/shared/AddEditProductModal";
import SortComponent from "@/features/home/components/SortComponent";

// next 15 부터 동적 라우팅은 비동기로 처리된다
// 따라서 params도 promise 형태로 감싸야 한다
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key: string]: "recent" | "reviewCount" | "rating";
  }>;
}) {
  const { id: categoryId } = await params;
  const decodeParams = decodeURIComponent(categoryId);
  const sp = await searchParams;

  const categoryIndexMap: Record<string, number> = {
    음악: 1,
    "영화/드라마": 2,
    "강의/책": 3,
    호텔: 4,
    "가구/인테리어": 5,
    식당: 6,
    전자기기: 7,
    화장품: 8,
    "의류/악세서리": 9,
    앱: 10,
  };

  console.log("현재 카테고리:", decodeParams);
  const categoryNumber = categoryIndexMap[decodeParams] ?? null;
  console.log("매핑된 번호:", categoryNumber);

  const products = await getProductsFetch({
    order: sp.sort,
    categoryId: categoryNumber,
  });

  console.log(products);

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-999">
        <Header />
      </header>

      <div className="relative flex flex-row lg:justify-center 2xl:px-[180px] md:px-0 px-[20px] mt-[100px]">
        <div className="fixed 2xl:left-[180px] md:left-0 md:flex hidden">
          <Category categoryId={categoryId} />
        </div>

        <div className="lg:flex flex-col mt-[60px] hidden lg:mb-[50px] mb-[30px] lg:w-[950px] md:w-[510px] w-[340px]">
          <div className="flex flex-row items-center justify-between">
            <span className="lg:text-[24px] text-[#F1F1F5] font-semibold">
              {decodeParams}의 모든 상품
            </span>
            <SortComponent />
          </div>

          <HighStarProduct products={products} />
          <MoreProducts
            key={decodeParams}
            nextCursor={products.nextCursor}
            categoryId={categoryNumber}
            queryKey={["products", categoryNumber]}
          />
        </div>

        <div className="flex flex-col lg:ml-0 md:ml-[180px]">
          <div className="lg:fixed 2xl:right-[180px]">
            <ReviewerRanking />
          </div>

          {/* 데스크톱 사이즈가 아닌 경우 */}
          <div className="lg:hidden flex flex-col mt-[60px] md:ml-[25px] md:w-[510px] w-[335px] lg:mb-[50px] mb-[30px]">
            <span className="text-[20px] text-[#F1F1F5] font-semibold">
              {decodeParams}의 모든 상품
            </span>

            <HighStarProduct products={products} />
            <MoreProducts
              key={decodeParams}
              nextCursor={products.nextCursor}
              categoryId={categoryNumber}
              queryKey={["products", categoryNumber]}
            />
          </div>
        </div>

        <div className="fixed lg:right-[180px] md:right-[30px] right-[20px] lg:bottom-[90px] md:bottom-[90px] bottom-[40px]">
          <FloatingButton />
        </div>
      </div>
      {sp.modal?.toString() === "true" && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <AddEditProductModal buttonPlaceholder="추가하기" />
        </div>
      )}
    </div>
  );
}
