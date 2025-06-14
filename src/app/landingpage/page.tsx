import AddProductModalIntro from "@/features/landing/components/AddProductModalIntro";
import AddReviewModalIntro from "@/features/landing/components/AddReviewModalIntro";
import CategoryGrid from "@/features/landing/components/CategoryGrid";
import CompareProducts from "@/features/landing/components/CompareProducts";
import Footer from "@/features/landing/components/Footer";
import HomePagePreview from "@/features/landing/components/HomePagePreview";
import LandingPageTop from "@/features/landing/components/LandingPageTop";
import MovingCategories from "@/features/landing/components/MovingCategories";
import SometimesTie from "@/features/landing/components/SometimesTie";
import SometimesWin from "@/features/landing/components/SometimesWin";

export default function LandingPage() {
  return (
    <>
      <main className="relative flex flex-col lg:px-[160px] px-[24px]">
        <img
          src="/signup_bg.jpg"
          alt="bgImage"
          className="absolute inset-0 w-full z-0 lg:h-[2000px] md:h-[1204px] h-[806px]"
        />
        <div className="z-10">
          <LandingPageTop />
          <HomePagePreview />
        </div>

        <MovingCategories />

        <CategoryGrid />

        <AddProductModalIntro />
        <AddReviewModalIntro />

        <CompareProducts />
        <SometimesWin />
        <SometimesTie />
      </main>

      <Footer />
    </>
  );
}
