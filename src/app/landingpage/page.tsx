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
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const csrfToken = cookieStore.get("csrf-token")?.value ?? "";
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.BASE_URL}/api/cookie`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
      "x-csrf-token": csrfToken,
    },
  });

  const data = await res.json();

  if (data.success) {
    console.log("로그인 된 상태여서 홈페이지로 이동합니다");
    redirect("/homepage");
  } else {
    console.log("랜딩페이지에서 로그인 돼있지 않음");
  }

  return (
    <>
      <main className="relative overflow-x-hidden flex flex-col lg:px-[160px] px-[24px]">
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
