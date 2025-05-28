import FloatingButton from "@/components/shared/FloatingButton";
import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";

export default function HomePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <header>
        <Header />
      </header>

      <div className="relative flex flex-row lg:justify-between lg:px-[180px] md:px-0 px-[20px]">
        <div className="md:flex hidden">
          <Category categoryId={params.id} />
        </div>

        <ReviewerRanking />

        <div className="fixed lg:right-[180px] md:right-[30px] right-[20px] bottom-[90px]">
          <FloatingButton />
        </div>
      </div>
    </div>
  );
}
