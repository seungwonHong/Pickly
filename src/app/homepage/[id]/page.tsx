import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";

// next 15 부터 동적 라우팅은 비동기로 처리된다
// 따라서 params도 promise 형태로 감싸야 한다
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
const {id: categoryId} = await params;

  return (
    <div>
      <header>
        <Header />
      </header>

      <div className="flex flex-row lg:justify-between lg:px-[180px] md:px-0 px-[20px]">
        <div className="md:flex hidden">
          <Category categoryId={categoryId} />
        </div>

        <ReviewerRanking />
      </div>
    </div>
  );
}
